export type PurchaseEvent = {
    _id: string
    type: 'gift-purchased'
    giftId: number
    senderId: number
    date: string
}

export type SendEvent = {
    _id: string
    type: 'gift-send'
    giftId: number
    senderId: number
    receiverId: number
    date: string
}

export type AppEvent = PurchaseEvent | SendEvent

export type AppEventWithUserNames = AppEvent & {
    senderFirstName: string
    receiverFirstName?: string
}
