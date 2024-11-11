export type User = {
    telegramId: number
    firstName: string
    lastName?: string
    username?: string
    languageCode?: string
    isPremium?: boolean
    createdAt: string
    receivedGiftCount: number
}

export type UserRank = {
    position: number
    user: User
}
