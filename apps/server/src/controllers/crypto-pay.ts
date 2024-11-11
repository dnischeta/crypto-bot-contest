import type { FastifyInstance } from 'fastify'
import type { GiftMeta, Invoice, Response } from '@crypto-bot-contest/types'
import { payForInvoice } from '../db/invoices'
import { createGift } from '../db/gift'
import { getGiftById } from '../db/gift-meta'

type CryptoApiInvoice = {
    invoice_id: number
    hash: string
    mini_app_invoice_url: string
    created_at: string
    expiration_date: string
    status: 'active' | 'paid' | 'expired',
    payload: string // `USER_ID:GIFT_ID`
}

type CryptoApiWebhookUpdate = {
    update_id: number
    update_type: 'invoice_paid'
    request_date: string
    payload: CryptoApiInvoice
}

export function createCryptoPayController(fastify: FastifyInstance) {
    fastify.post<{ Body: CryptoApiWebhookUpdate }>(`/${process.env.CRYPTO_PAY_TOKEN}`, async (request, response) => {
        const invoice = request.body.payload
        const payload = invoice.payload

        if (invoice.status !== 'paid') {
            // Only paid status is supported by us and crypto pay
            return response.send()
        }

        const ids = payload.split(':')

        if (ids.length !== 2) {
            return response.send()
        }

        const userId = parseInt(ids[0], 10)
        const giftId = parseInt(ids[1], 10)

        if (Number.isNaN(userId) || Number.isNaN(giftId)) {
            return response.send()
        }

        const paid = await payForInvoice(fastify.mongo.db, { userId, giftId, createdAt: invoice.created_at })

        if (paid) {
            await createGift(fastify.mongo.db, {
                giftId,
                ownerId: userId,
            })

            getGiftById(fastify.mongo.db, giftId).then((giftMeta) => {
                fastify.bot.sendGiftPurchasedNotification({ telegramId: userId, giftName: giftMeta!.name })
            })
        }

        return response.send();
    })
}

type GetInvoicesParams = {
    invoiceIds?: number[]
    status?: 'active' | 'paid'
}

export async function getInvoices(params: GetInvoicesParams): Promise<Response<{ items: CryptoApiInvoice[] }>> {
    const sp = new URLSearchParams()

    if (params.invoiceIds) {
        sp.append('invoice_ids', params.invoiceIds.join(','))
    }
    if (params.status) {
        sp.append('status', params.status)
    }

    const response = await fetch(`${process.env.CRYPTO_PAY_API_URL}/getInvoices?${sp.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Crypto-Pay-API-Token': process.env.CRYPTO_PAY_TOKEN,
        },
    })

    const responseBody = await response.json() as Response<{ items: CryptoApiInvoice[] }>

    return responseBody
}

export async function createInvoice({ userId, gift }: { userId: number, gift: GiftMeta }): Promise<Response<Invoice>> {
    const response = await fetch(`${process.env.CRYPTO_PAY_API_URL}/createInvoice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Crypto-Pay-API-Token': process.env.CRYPTO_PAY_TOKEN,
        },
        body: JSON.stringify({
            amount: gift.price.amount.toString(10),
            asset: gift.price.asset,
            description: `Purchasing a ${gift.name} gift`,
            payload: `${userId}:${gift.id}`,
            // paid_btn_url: `https://t.me/dim_contest_bot/app?startapp=${gift.id}`,
            expires_in: 60 * 3, // 3 mins
        }),
    })

    const responseBody = await response.json() as Response<CryptoApiInvoice>

    if (!responseBody.ok) {
        return responseBody
    }

    return {
        ok: true,
        result: {
            invoiceId: responseBody.result.invoice_id,
            createdAt: responseBody.result.created_at,
            expirationDate: responseBody.result.expiration_date,
            giftId: gift.id,
            miniAppInvoiceUrl: responseBody.result.mini_app_invoice_url,
            status: responseBody.result.status,
            userId,
        },
    }
}
