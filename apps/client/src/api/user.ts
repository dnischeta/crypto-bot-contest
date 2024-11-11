import type {
  ApiGetUserRankResponse,
  ApiGetUserRequest,
  ApiGetUserResponse,
  ApiLoginRequest,
  ApiLoginResponse,
} from '@crypto-bot-contest/types'
import { request } from '@/utils/request'

const paths = {
  login: '/login',
  user: (id: number) => `/user/${id}`,
  userRank: (id: number) => `/rank/${id}`,
}

export async function login(body: ApiLoginRequest) {
  return request<ApiLoginResponse>(paths.login, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getUser(params: ApiGetUserRequest) {
  return request<ApiGetUserResponse>(paths.user(params.telegramId))
}

export async function getUserRank(params: { telegramId: number }) {
  return request<ApiGetUserRankResponse>(paths.userRank(params.telegramId))
}
