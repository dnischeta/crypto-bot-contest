import type { FastifyInstance } from 'fastify'
import { getLeaderboard, getUserRank } from '../db/user'
import type { ApiGetLeaderboardQuery, ApiGetLeaderboardResponse, ApiGetUserRankResponse } from '@crypto-bot-contest/types'

export function createRankingController(fastify: FastifyInstance) {
    fastify.get<{ Reply: ApiGetLeaderboardResponse, Querystring: ApiGetLeaderboardQuery }>('/leaderboard', async (request, reply) => {
        const rankings = await getLeaderboard(fastify.mongo.db, request.query.s)
        reply.send({ ok: true, result: rankings })
    })

    fastify.get<{
        Params: { telegramId: string },
        Reply: ApiGetUserRankResponse
    }>('/rank/:telegramId', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    telegramId: { type: 'integer' },
                },
                required: ['telegramId'],
            },
        },
    }, async (request, reply) => {
        const telegramId = parseInt(request.params.telegramId, 10)
        const rank = await getUserRank(fastify.mongo.db, telegramId)

        if (!rank) {
            reply.code(404).send({ ok: false, error: 'User not found' })
            return
        }

        reply.send({ ok: true, result: rank })
    })
} 