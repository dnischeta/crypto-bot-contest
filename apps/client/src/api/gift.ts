import type {
  ApiGiftMetaResponse,
  ApiPurchasedGiftsResponse,
  ApiBuyGiftResponse,
  ApiBuyGiftRequest,
  ApiReceiveGiftResponse,
  ApiReceivedGiftsResponse,
} from '@crypto-bot-contest/types'
import { request } from '@/utils/request'

const paths = {
  list: '/gift',
  own: '/gift/own',
  buy: '/gift/buy',
  receive: (giftId: string) => `/gift/receive/${giftId}`,
  receivedGifts: (userId: number) => `/gift/of/${userId}`,
}

export async function getGifts() {
  return request<ApiGiftMetaResponse>(paths.list)
}

export async function getOwnGifts() {
  return request<ApiPurchasedGiftsResponse>(`${paths.own}`)
}

export async function buyGift(body: ApiBuyGiftRequest) {
  return request<ApiBuyGiftResponse>(paths.buy, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function receiveGift(giftId: string) {
  return request<ApiReceiveGiftResponse>(paths.receive(giftId))
}

export async function getReceivedGifts(userId: number) {
  return request<ApiReceivedGiftsResponse>(paths.receivedGifts(userId))
}
