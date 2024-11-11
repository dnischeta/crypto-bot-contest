import { requestRaw } from '@/utils/request'

const paths = { avatar: (id: number) => `/user/${id}/avatar` }

export async function getAvatar(userId: number): Promise<string | null> {
  const avatarResponse = await requestRaw(paths.avatar(userId))

  if (!avatarResponse) {
    return null
  }

  return await responseToBase64(avatarResponse)
}

async function responseToBase64(response: Response) {
  const blob = await response.blob()

  const reader = new FileReader()

  await new Promise((resolve, reject) => {
    reader.onload = resolve
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
  return reader.result as string
}
