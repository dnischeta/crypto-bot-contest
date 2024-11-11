import util from 'node:util'
import fp from 'fastify-plugin';
import { MongoClient } from 'mongodb';
import type { FastifyInstance } from 'fastify';
import { User } from '@crypto-bot-contest/types';

async function mongoConnector(fastify: FastifyInstance) {
    const url = util.format(
        'mongodb://%s:%s@%s/',
        process.env.DB_USER,
        process.env.DB_PASS,
        process.env.DB_HOST,
    )

    const client = await MongoClient.connect(url, {
        tls: true,
        tlsCAFile: process.env.DB_CERT_PATH,
        replicaSet: process.env.DB_REPLICAS_SET,
        authSource: process.env.DB_NAME,
    })

    const db = client.db(process.env.DB_NAME)

    await db.collection<User>('users').createIndex(
        { receivedGiftCount: -1, telegramId: 1 },
    )

    await db.collection('users').createIndex({ 
        firstName: 1,
        lastName: 1,
        username: 1,
    })

    fastify.decorate('mongo', {
        client: client,
        db,
    })

    fastify.addHook('onClose', async (fastify) => {
        await fastify.mongo.client.close()
    })
}
export const mongoPluginFactory = () => fp(mongoConnector);

