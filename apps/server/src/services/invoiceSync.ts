import type { Db } from 'mongodb'
import type { InvoiceStatus } from '@crypto-bot-contest/types'
import { getInvoices } from '../controllers/crypto-pay'
import { getAllActiveInvoices, setInvoicesStatus } from '../db/invoices'
import { releaseGifts } from '../db/gift-meta'

export async function synchronizeInvoices(db: Db) {
    try {
        const activeInvoices = await getAllActiveInvoices(db)

        if (activeInvoices.length === 0) {
            return
        }

        const response = await getInvoices({
            invoiceIds: activeInvoices.map(i => i.invoiceId)
        })


        if (!response.ok) {
            console.error('Failed to get invoices from CryptoPay:', response.error)
            return
        }

        const expiredInvoices = response.result.items.filter(invoice => invoice.status === 'expired')
        
        if (expiredInvoices.length > 0) {
            const expiredInvoiceIds = expiredInvoices.map(i => i.invoice_id)
            const expiredGiftIds = activeInvoices
                .filter(invoice => expiredInvoiceIds.includes(invoice.invoiceId))
                .map(invoice => invoice.giftId)

            await releaseGifts(db, expiredGiftIds)
        }

        const statuses = response.result.items.map((invoice) => [invoice.invoice_id, invoice.status] as [number, InvoiceStatus])
        await setInvoicesStatus(db, statuses)
    } catch (error) {
        console.error('Error synchronizing invoices:', error)
    }
}
