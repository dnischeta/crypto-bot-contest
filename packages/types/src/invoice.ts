export type InvoiceStatus = 'active' | 'expired' | 'paid'

export type Invoice = {
    invoiceId: number
    userId: number
    giftId: number
    status: InvoiceStatus
    createdAt: string
    expirationDate: string
    miniAppInvoiceUrl: string
}
