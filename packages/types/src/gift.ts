export type Asset = 'TON' | 'ETH' | 'USDT'

export type Price = { amount: number, asset: Asset }

export type GiftMeta = {
    id: number
    name: string
    totalQty: number
    soldQty: number
    price: Price
    img:
    | 'gift-blue-star'
    | 'gift-delicious-cake'
    | 'gift-green-star'
    | 'gift-red-star'
    // Only #RRGGBB format is supported for now
    accentColor?: string
}

type GiftShared = {
    _id: string
    giftId: number
    ownerId: number
    purchasedAt: string
}

export type PurchasedGift = GiftShared & {
    status: 'purchased'
}

export type ReceivedGift = GiftShared & {
    status: 'received'
    receiverId: number
    sentAt: string
    receivedAt: string
}

export type ReceivedGiftWithNames = ReceivedGift & { senderFirstName: string }

export type SentGift = GiftShared & {
    status: 'sent'
    sentAt: string
}

export type Gift = PurchasedGift | SentGift | ReceivedGift
