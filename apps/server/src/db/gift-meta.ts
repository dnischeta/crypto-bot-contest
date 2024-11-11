import type { GiftMeta } from '@crypto-bot-contest/types'
import type { Db } from 'mongodb'

const GIFT_COLLECTION = 'gifts-meta'

export async function getGifts(db: Db) {
    const result = await db.collection<GiftMeta>(GIFT_COLLECTION).find().toArray()

    return result
}

export async function createGifts(db: Db, gifts: GiftMeta[]) {
    const existingGiftIds = new Set((await getGifts(db)).map((g) => g.id))

    const giftsToCreate = gifts.filter((g) => !existingGiftIds.has(g.id))

    if (giftsToCreate.length === 0) {
        return
    }

    await db.collection<GiftMeta>(GIFT_COLLECTION).insertMany(giftsToCreate)
}

export async function getGiftById(db: Db, giftId: number): Promise<GiftMeta | null> {
    return await db.collection<GiftMeta>(GIFT_COLLECTION).findOne({ id: giftId })
}

export async function reserveGift(db: Db, id: number): Promise<void> {
    await db.collection<GiftMeta>(GIFT_COLLECTION).updateOne(
        { id },
        { $inc: { soldQty: 1 } },
    )
}

export async function releaseGifts(db: Db, ids: number[]) {
    await db.collection<GiftMeta>(GIFT_COLLECTION).updateMany(
        { id: { $in: ids } },
        { $inc: { soldQty: -1 } },
    )
}
