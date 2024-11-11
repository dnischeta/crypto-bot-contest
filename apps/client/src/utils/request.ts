import { retrieveLaunchParams } from '@telegram-apps/sdk-vue'

type RequestParams = Parameters<typeof fetch>

export async function request<T>(...args: RequestParams) {
  const headers = args[1]?.headers ?? {}
  const response = await fetch(`${import.meta.env.VITE_API_URL}${args[0]}`, {
    ...args[1],
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `tma ${retrieveLaunchParams().initDataRaw}`,
    },
  })
  if (!response.ok) throw new Error(response.statusText)
  return (await response.json()) as T
}

export async function requestRaw(...args: RequestParams) {
  const headers = args[1]?.headers ?? {}
  const response = await fetch(`${import.meta.env.VITE_API_URL}${args[0]}`, {
    ...args[1],
    headers: {
      ...headers,
      Authorization: `tma ${retrieveLaunchParams().initDataRaw}`,
    },
  })
  if (!response.ok) throw new Error(response.statusText)
  return response
}
