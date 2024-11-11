import fp from 'fastify-plugin'
import { synchronizeInvoices } from '../services/invoiceSync'
import type { FastifyInstance } from 'fastify'

const SYNC_INTERVAL = 60 * 1000

async function invoiceSyncPlugin(fastify: FastifyInstance) {
    await synchronizeInvoices(fastify.mongo.db)

    const interval = setInterval(() => {
        synchronizeInvoices(fastify.mongo.db)
    }, SYNC_INTERVAL)

    fastify.addHook('onClose', async () => {
        clearInterval(interval)
    })
}

export const invoiceSyncPluginFactory = () => fp(invoiceSyncPlugin)
