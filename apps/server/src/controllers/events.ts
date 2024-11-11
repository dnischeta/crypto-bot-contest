import type { FastifyInstance } from "fastify";
import type { ApiGetGiftEventsRequest, ApiGetGiftEventsResponse, ApiGetUserEventsRequest, ApiGetUserEventsResponse } from "@crypto-bot-contest/types";
import { getGiftEvents, getUserEvents } from "../db/event";

export function createEventsController(fastify: FastifyInstance) {
    type GetUserEventsRequest = { Params: ApiGetUserEventsRequest, Reply: ApiGetUserEventsResponse }
    fastify.get<GetUserEventsRequest>('/events/user/:telegramId', {
        schema: {
            params: {
                type: 'object',
                properties: { telegramId: { type: 'integer' } },
                required: ['telegramId']
            }
        }
    }, async (request, reply) => {
        const events = await getUserEvents(fastify.mongo.db, request.params.telegramId)
        reply.send({ ok: true, result: events })
    })

    type GetGiftEventsRequest = { Params: ApiGetGiftEventsRequest, Reply: ApiGetGiftEventsResponse }
    fastify.get<GetGiftEventsRequest>('/events/gift/:giftId', {
        schema: {
            params: {
                type: 'object',
                properties: { giftId: { type: 'integer' } },
                required: ['giftId']
            }
        }
    }, async (request, reply) => {
        const events = await getGiftEvents(fastify.mongo.db, request.params.giftId)
        reply.send({ ok: true, result: events })
    })
}
