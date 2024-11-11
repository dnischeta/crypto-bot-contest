import { request } from '@/utils/request'
import type {
  ApiGetGiftEventsResponse,
  ApiGetUserEventsResponse,
} from '@crypto-bot-contest/types'

const parts = {
  giftActions: (id: number) => `/events/gift/${id}`,
  userActions: (id: number) => `/events/user/${id}`,
}

export function getGiftActions(id: number) {
  return request<ApiGetGiftEventsResponse>(parts.giftActions(id))
}

export function getUserActions(id: number) {
  return request<ApiGetUserEventsResponse>(parts.userActions(id))
}
