import type { FastifyInstance } from 'fastify'
import { getGifts, getGiftById, reserveGift } from '../db/gift-meta'
import { getUserPurchasedGifts, getUserReceivedGifts, receiveGift } from '../db/gift'
import { saveInvoice, findActiveInvoice, findInvoiceById } from '../db/invoices'
import { createInvoice } from './crypto-pay'
import { ApiGetInvoiceStatusRequest, ApiGetInvoiceStatusResponse, ApiPurchasedGiftsResponse, ApiBuyGiftRequest, ApiBuyGiftResponse, ApiGiftMetaResponse, ApiReceiveGiftResponse, ApiReceivedGiftsRequest, ApiReceivedGiftsResponse, ReceivedGift } from '@crypto-bot-contest/types'
import { getUser, getUserNames } from '../db/user'

export function createGiftController(fastify: FastifyInstance) {
    fastify.get<{ Reply: ApiGiftMetaResponse }>('/gift', async (request, reply) => {
        const gifts = await getGifts(fastify.mongo.db)

        reply.send({ ok: true, result: gifts })
    })

    fastify.get<{ Reply: ApiPurchasedGiftsResponse }>('/gift/own', async (request, reply) => {
        const userId = request.user!.id
        const gifts = await getUserPurchasedGifts(fastify.mongo.db, userId)
        reply.send({ ok: true, result: gifts })
    })

    fastify.post<{ Body: ApiBuyGiftRequest, Reply: ApiBuyGiftResponse }>('/gift/buy', async (request, reply) => {
        const { giftId, userId } = request.body

        if (!giftId || !userId) {
            reply.code(400).send()
            return
        }
        const gift = await getGiftById(fastify.mongo.db, giftId)

        if (!gift) {
            reply.code(400).send({ ok: false, error: `No gift with id: ${giftId}` })
            return
        }

        if (gift.soldQty >= gift.totalQty) {
            reply.code(400).send({ ok: false, error: 'No such gift left' })
            return
        }

        await reserveGift(fastify.mongo.db, gift.id)

        let invoice = await findActiveInvoice(fastify.mongo.db, { userId, giftId })

        if (!invoice) {
            const createInvoiceResponse = await createInvoice({ userId, gift })

            if (!createInvoiceResponse.ok) {
                reply.code(500).send({ ok: false, error: createInvoiceResponse.error })
                return
            }

            invoice = createInvoiceResponse.result

            await saveInvoice(fastify.mongo.db, invoice)
        }

        reply.send({ ok: true, result: { invoiceId: invoice!.invoiceId, invoiceUrl: invoice!.miniAppInvoiceUrl } })
    })

    fastify.get<{
        Params: ApiGetInvoiceStatusRequest,
        Reply: ApiGetInvoiceStatusResponse
    }>('/gift/check-invoice/:invoiceId',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        invoiceId: { type: 'integer' },
                    },
                    required: ['invoiceId'],
                },
            },
        },
        async (request, reply) => {
            const invoice = await findInvoiceById(fastify.mongo.db, { invoiceId: request.params.invoiceId })

            if (!invoice) {
                reply.code(404).send({ ok: false, error: 'Invoice not found or already processed' })
                return
            }

            reply.send({ ok: true, result: { status: invoice.status } })
        }
    )

    fastify.get<{ Params: { giftId: string }, Reply: ApiReceiveGiftResponse }>('/gift/receive/:giftId', async (request, reply) => {
        const userId = request.user!.id

        try {
            const gift = await receiveGift(fastify.mongo.db, userId, request.params.giftId)
            if (!gift) {
                reply.send({ ok: false, error: 'Failed to receive gift' })
                return
            }

            await sendGiftReceiveNotifications(fastify, gift as ReceivedGift)

            reply.send({ ok: true, result: { giftMetaId: gift.giftId } })
        } catch (error) {
            reply.send({ ok: false, error: (error as Error).message })
        }
    })

    fastify.get<{ Params: ApiReceivedGiftsRequest, Reply: ApiReceivedGiftsResponse }>('/gift/of/:telegramId',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        telegramId: { type: 'integer' },
                    },
                    required: ['telegramId'],
                },
            },
        },
        async (request, reply) => {
            const result = await getUserReceivedGifts(fastify.mongo.db, request.params.telegramId)
            const senderIds = new Set(result.map((g) => g.ownerId))
            const senderNames = await getUserNames(fastify.mongo.db, Array.from(senderIds))

            reply.send({ ok: true, result: result.map((g) => ({ ...g, senderFirstName: senderNames[g.ownerId] })) })
        },
    )

    async function sendGiftReceiveNotifications(fastify: FastifyInstance, gift: ReceivedGift) {
        const [giftMeta, sender, receiver] = await Promise.all([
            getGiftById(fastify.mongo.db, gift.giftId),
            getUser(fastify.mongo.db, gift.ownerId),
            getUser(fastify.mongo.db, gift.receiverId),
        ])

        if (!giftMeta || !sender || !receiver) {
            // TODO: log error
            console.error('Failed to send gift receive notifications', { gift, giftMeta, sender, receiver })
            return
        }

        await Promise.all([
            fastify.bot.sendReceivedGiftNotification({
                telegramId: gift.receiverId,
                senderFirstName: sender.firstName,
                giftName: giftMeta.name
            }),
            fastify.bot.sendGiftDeliveredNotification({
                telegramId: gift.ownerId,
                receiverFirstName: receiver.firstName,
                giftName: giftMeta.name
            }),
        ])
    }
}
