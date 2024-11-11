import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initializeBot } from '../bot';

const IS_DEV = process.env.NODE_ENV === 'dev'

async function botInitializer(fastify: FastifyInstance) {
    if (IS_DEV) {
        fastify.decorate('bot', {
            sendReceivedGiftNotification: () => { },
            sendGiftDeliveredNotification: () => { },
            sendGiftPurchasedNotification: () => { },
        })
        return
    }

    const bot = initializeBot(fastify)

    fastify.decorate('bot', bot)
}

export const botPluginFactory = () => fp(botInitializer);

