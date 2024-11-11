import { AppEventWithUserNames } from "./event"
import { Gift, GiftMeta, ReceivedGiftWithNames } from "./gift"
import { User, UserRank } from "./user"

export type Response<T> = { ok: true, result: T } | { ok: false, error: unknown }

export type ApiLoginRequest = { initDataRaw: string }
export type ApiLoginResponse = Response<User>

export type ApiGetUserRequest = { telegramId: number }
export type ApiGetUserResponse = Response<User>

export type ApiGiftMetaResponse = Response<GiftMeta[]>
export type ApiPurchasedGiftsResponse = Response<Gift[]>

export type ApiBuyGiftRequest = {
    userId: number
    giftId: number
}
export type ApiBuyGiftResponse = Response<{ invoiceId: number; invoiceUrl: string }>

export type ApiReceiveGiftResponse = Response<{ giftMetaId: number }>

export type ApiReceivedGiftsRequest = { telegramId: number }
export type ApiReceivedGiftsResponse = Response<ReceivedGiftWithNames[]>

export type ApiGetLeaderboardQuery = { s?: string }
export type ApiGetLeaderboardResponse = Response<UserRank[]>
export type ApiGetUserRankResponse = Response<UserRank>

export type ApiGetUserEventsRequest = { telegramId: number }
export type ApiGetUserEventsResponse = Response<Array<{ date: string, events: AppEventWithUserNames[] }>>

export type ApiGetGiftEventsRequest = { giftId: number }
export type ApiGetGiftEventsResponse = Response<AppEventWithUserNames[]>

export type ApiGetInvoiceStatusRequest = {
    invoiceId: number
}

export type ApiGetInvoiceStatusResponse = Response<{
    status: 'active' | 'paid' | 'expired'
}>
