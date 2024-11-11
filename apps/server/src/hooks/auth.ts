import { validate, parse } from '@telegram-apps/init-data-node'
import type { FastifyInstance } from 'fastify'
export function setupAuth(fastify: FastifyInstance, IS_DEV: boolean) {
    fastify.addHook('preHandler', (request, reply, next) => {
        if (request.url === `/${process.env.CRYPTO_PAY_TOKEN}`) {
            next()
            return
        }

        try {
            const authHeader = request.headers['authorization'];
            if (!authHeader) {
                return reply.status(401).send({ error: 'Unauthorized' });
            }

            const [method, token] = authHeader.split(' ');

            switch (method) {
                case 'tma': {
                    try {
                        validate(token, process.env.BOT_TOKEN, { expiresIn: IS_DEV ? Infinity : 3600 })
                        request.user = parse(token).user
                        next()
                        break
                    } catch (error) {
                        return reply.status(401).send({ error: 'Invalid token' });
                    }
                }
                default:
                    return reply.status(401).send({ error: 'Invalid authorization method' });
            }
        } catch (error) {
            request.log.error(error);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    })
}
