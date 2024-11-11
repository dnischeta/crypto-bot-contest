import 'fastify';
import type { MongoClient, Db } from 'mongodb';
import type { InitData } from '@telegram-apps/init-data-node';
import { initializeBot } from './src/bot';

declare module 'fastify' {
    interface FastifyInstance {
        mongo: {
            client: MongoClient;
            db: Db;
        };
        bot: ReturnType<typeof initializeBot>;
    }

    interface FastifyRequest {
        user: InitData['user'];
    }
}
