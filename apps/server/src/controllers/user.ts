import { validate, parse } from '@telegram-apps/init-data-node'
import type { ApiGetUserRequest, ApiGetUserResponse, ApiLoginRequest, ApiLoginResponse, User } from '@crypto-bot-contest/types'
import type { FastifyInstance } from 'fastify'
import { createOrUpdateUser, getUser, getUserAvatarUrl } from '../db/user'

export function createUserController(fastify: FastifyInstance, IS_DEV: boolean) {
    fastify.post<{ Body: ApiLoginRequest, Reply: ApiLoginResponse }>('/login', async (request, reply) => {
        const { initDataRaw } = request.body

        try {
            validate(initDataRaw, process.env.BOT_TOKEN, { expiresIn: IS_DEV ? Infinity : 3600 })
            const initData = parse(initDataRaw)

            if (!initData || !initData.user) {
                throw new Error('Failed to parse init data')
            }

            const { user } = initData

            const userData: Omit<User, 'createdAt' | 'purchasedGifts' | 'receivedGiftCount'> = {
                telegramId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                languageCode: user.languageCode,
                isPremium: user.isPremium,
            }

            const savedUser = await createOrUpdateUser(fastify.mongo.db, userData)

            reply.send({ ok: true, result: savedUser })
        } catch (error) {
            reply.code(400).send({ ok: false, error: error.message })
        }
    })

    fastify.get<{
        Params: ApiGetUserRequest,
        Reply: ApiGetUserResponse
    }>('/user/:telegramId',
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
            const { telegramId } = request.params
            const user = await getUser(fastify.mongo.db, telegramId)

            if (!user) {
                reply.code(404).send({ ok: false, error: 'User not found' })
                return
            }

            reply.send({ ok: true, result: user })
        })

    fastify.get<{ Params: { telegramId: number } }>(
        '/user/:telegramId/avatar',
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
            const photoUrl = await getUserAvatarUrl(fastify.mongo.db, request.params.telegramId)

            if (!photoUrl) {
                reply.code(404).send({ ok: false, error: 'Not found' })
                return
            }

            const avatarResponse = await fetch(photoUrl)

            if (!avatarResponse.ok) {
                reply.code(404).send({ ok: false, error: 'Not found' })
                return
            }

            const buffer = await avatarResponse.arrayBuffer()
            const contentType = avatarResponse.headers.get('content-type')

            reply
                .header('Content-Type', contentType || 'image/jpeg')
                .header('Cache-Control', 'public, max-age=3600')
                .send(Buffer.from(buffer))
        })
}
