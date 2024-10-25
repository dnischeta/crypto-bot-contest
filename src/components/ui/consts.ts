export const ICONS = ['ton', 'eth', 'usdt'] as const

export type Icon = (typeof ICONS)[number]
