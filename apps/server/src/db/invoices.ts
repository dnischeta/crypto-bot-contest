import type { Db } from 'mongodb'
import type { Invoice, InvoiceStatus } from '@crypto-bot-contest/types'

const INVOICE_COLLECTION = 'invoices'

export async function saveInvoice(db: Db, doc: Invoice): Promise<void> {
    await db.collection<Invoice>(INVOICE_COLLECTION).insertOne(doc)
}

export async function getAllActiveInvoices(db: Db): Promise<Invoice[]> {
    return await db.collection<Invoice>(INVOICE_COLLECTION)
        .find({ status: 'active' })
        .toArray()
}

export async function setInvoicesStatus(db: Db, statuses: Array<[number, InvoiceStatus]>) {
    if (statuses.length === 0) {
        return
    }

    const bulkOps = statuses.map(([invoiceId, status]) => ({
        updateOne: {
            filter: { invoiceId },
            update: { $set: { status } }
        }
    }))

    await db.collection<Invoice>(INVOICE_COLLECTION).bulkWrite(bulkOps)
}

export async function findActiveInvoice(db: Db, filter: { userId: number, giftId: number }): Promise<Invoice | null> {
    const invoice = await db.collection<Invoice>(INVOICE_COLLECTION).findOne({
        ...filter,
        status: 'active',
    })

    if (invoice && invoice.expirationDate && new Date(invoice.expirationDate) < new Date()) {
        return null
    }

    return invoice
}

export async function findInvoiceById(db: Db, filter: { invoiceId: number }): Promise<Invoice | null> {
    const invoice = await db.collection<Invoice>(INVOICE_COLLECTION).findOne({
        invoiceId: filter.invoiceId,
    })

    return invoice
}

export async function payForInvoice(db: Db, filter: { userId: number, giftId: number, createdAt: string }): Promise<boolean> {
    const invoice = await db.collection<Invoice>(INVOICE_COLLECTION).findOneAndUpdate(
        filter,
        { $set: { status: 'paid' } },
    )

    if (!invoice) {
        return false
    }

    return true
}

export async function updateInvoiceStatus(db: Db, invoiceId: number, status: string): Promise<void> {
    await db.collection('invoices').updateOne(
        { invoiceId },
        { $set: { status } }
    )
}
