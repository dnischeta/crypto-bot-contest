import fs from "node:fs";
import fastify from "fastify";
import fastifyCors from '@fastify/cors'

import { mongoPluginFactory } from './plugins/mongo'
import { createUserController } from './controllers/user'
import { createGiftController } from './controllers/gift'
import { createCryptoPayController } from './controllers/crypto-pay'
import { createRankingController } from './controllers/ranking'
import { createEventsController } from './controllers/events'
import { setupAuth } from './hooks/auth'
import { setupSeedDb } from './hooks/seed-db'
import { botPluginFactory } from "./plugins/bot";
import { invoiceSyncPluginFactory } from './plugins/invoiceSync'
import { log } from './logger'

const IS_DEV = process.env.NODE_ENV === 'dev'

const https = IS_DEV
    ? null
    : {
        key: fs.readFileSync('/etc/letsencrypt/live/api.dumasiq.ru/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/api.dumasiq.ru/fullchain.pem')
    };

const server = fastify({
    https,
    logger: true
});

server.setErrorHandler((error, request, reply) => {
  log(error, {
    url: request.url,
    method: request.method,
    params: request.params,
    query: request.query,
    body: request.body,
    headers: request.headers,
  })

  const statusCode = error.statusCode || 500
  
  reply.status(statusCode).send({
    ok: false,
    error: statusCode === 500 ? 'Internal Server Error' : error.message
  })
})

server.register(mongoPluginFactory())
server.register(botPluginFactory())
server.register(invoiceSyncPluginFactory())
server.register(fastifyCors, { origin: '*', methods: '*' })
setupSeedDb(server)
setupAuth(server, IS_DEV)
createUserController(server, IS_DEV)
createGiftController(server)
createRankingController(server)
createCryptoPayController(server)
createEventsController(server)

const start = async () => {
    try {
        await server.listen({ port: IS_DEV ? 8080 : 443, host: '0.0.0.0' })
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();
