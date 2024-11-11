import type { Db } from "mongodb"
import { ObjectId } from "mongodb"
import type { Gift, ReceivedGift, SendEvent } from "@crypto-bot-contest/types"
import { incrementUserGiftCount } from "./user"
import { logEvent } from './event';

const GIFT_COLLECTION = 'gifts'

export async function getUserPurchasedGifts(db: Db, userId: number): Promise<Gift[]> {
    const result = await db.collection<Gift>(GIFT_COLLECTION)
        .find({ ownerId: userId, status: 'purchased' })
        .toArray()

    return result
}

export async function getUserReceivedGifts(db: Db, telegramId: number): Promise<ReceivedGift[]> {
    const result = await db.collection<Gift>(GIFT_COLLECTION)
        .find({ receiverId: telegramId, status: 'received' })
        .toArray() as ReceivedGift[]

    return result
}

export async function createGift(db: Db, gift: Pick<Gift, 'giftId' | 'ownerId'>) {
    await db.collection<Omit<Gift, '_id'>>(GIFT_COLLECTION).insertOne({
        giftId: gift.giftId,
        ownerId: gift.ownerId,
        status: 'purchased',
        purchasedAt: new Date().toISOString(),
    });

    await logEvent(db, {
        type: 'gift-purchased',
        giftId: gift.giftId,
        senderId: gift.ownerId,
        date: new Date().toISOString(),
    });
}

export async function sendGift(
    db: Db,
    giftId: string,
): Promise<boolean> {
    const result = await db.collection<Omit<Gift, '_id'> & { _id: ObjectId }>(GIFT_COLLECTION).updateOne(
        {
            _id: new ObjectId(giftId),
            status: 'purchased'
        },
        {
            $set: {
                status: 'sent',
                sentAt: new Date().toISOString()
            }
        }
    )

    return result.modifiedCount === 1
}

export async function receiveGift(
    db: Db,
    userId: number,
    giftId: string
): Promise<Omit<ReceivedGift, '_id'> | undefined> {
    const gift = await db.collection<Omit<Gift, '_id'> & { _id: ObjectId }>(GIFT_COLLECTION).findOne({
        _id: new ObjectId(giftId),
        status: 'sent'
    });

    if (gift && gift.ownerId === userId) {
        throw new Error('Cannot receive your own gift');
    }

    const result = await db.collection<Omit<Gift, '_id'> & { _id: ObjectId }>(GIFT_COLLECTION).findOneAndUpdate(
        {
            _id: new ObjectId(giftId),
            status: 'sent'
        },
        {
            $set: {
                status: 'received',
                receiverId: userId,
                receivedAt: new Date().toISOString(),
            }
        },
        { returnDocument: 'after' }
    )

    if (!result) {
        throw new Error('Gift not found or already received');
    }

    await Promise.all([
        incrementUserGiftCount(db, userId),
        logEvent(db, {
            type: 'gift-send',
            giftId: result.giftId,
            senderId: result.ownerId,
            receiverId: userId,
            date: new Date().toISOString(),
        } as Omit<SendEvent, '_id'>)
    ])

    return result as unknown as Omit<ReceivedGift, '_id'>
}
