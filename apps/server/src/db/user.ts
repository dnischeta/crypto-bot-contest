import type { User, UserRank } from '@crypto-bot-contest/types'
import type { Db } from 'mongodb'

const USER_COLLECTION = 'users'

export async function createOrUpdateUser(
    db: Db,
    doc: Omit<User, 'createdAt' | 'purchasedGifts' | 'receivedGiftCount'> & { photoUrl?: string },
): Promise<User> {
    const result = await db.collection<User & { photoUrl?: string }>(USER_COLLECTION).findOneAndUpdate(
        { telegramId: doc.telegramId },
        { $set: doc, $setOnInsert: { createdAt: new Date().toISOString(), receivedGiftCount: 0 } },
        { upsert: true, returnDocument: 'after', projection: { photoUrl: 0 } },
    )

    return result!
}


export async function getUser(db: Db, telegramId: number): Promise<User | null> {
    return await db.collection<User>(USER_COLLECTION).findOne({ telegramId }, { projection: { photoUrl: 0 } })
}

export async function getUserWithPhotoUrl(db: Db, telegramId: number): Promise<User & { photoUrl: string } | null> {
    return await db.collection<User & { photoUrl: string }>(USER_COLLECTION).findOne({ telegramId })
}

export async function getUserAvatarUrl(db: Db, telegramId: number): Promise<string | null> {
    const result = await db.collection<User & { photoUrl?: string }>(USER_COLLECTION).findOne({ telegramId })

    return result?.photoUrl ?? null
}

export async function incrementUserGiftCount(db: Db, telegramId: number): Promise<void> {
    await db.collection<User>(USER_COLLECTION).updateOne(
        { telegramId },
        { $inc: { receivedGiftCount: 1 } }
    )
}

export async function getUserRank(db: Db, telegramId: number): Promise<UserRank | null> {
    const user = await db.collection<User>(USER_COLLECTION).findOne(
        { telegramId },
        { projection: { photoUrl: 0 } }
    )

    if (!user) {
        return null
    }

    const position = await db.collection<User>(USER_COLLECTION)
        .countDocuments({
            $or: [
                { receivedGiftCount: { $gt: user.receivedGiftCount } },
                {
                    receivedGiftCount: user.receivedGiftCount,
                    telegramId: { $lt: user.telegramId }
                }
            ]
        }) + 1

    return { position, user }
}

export async function getLeaderboard(db: Db, search?: string, limit: number = 100): Promise<UserRank[]> {
    const matchStage = search
        ? {
            $match: {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { username: { $regex: search, $options: 'i' } }
                ]
            }
        }
        : { $match: {} }

    const result = await db.collection<User>(USER_COLLECTION)
        .aggregate([
            {
                $setWindowFields: {
                    sortBy: { receivedGiftCount: -1 },
                    output: {
                        position: {
                            $documentNumber: {}
                        }
                    }
                }
            },
            {
                $sort: { receivedGiftCount: -1, telegramId: 1 }
            },
            matchStage,
            { $project: { photoUrl: 0 } },
            { $limit: limit },
            {
                $addFields: {
                    user: {
                        $mergeObjects: [
                            "$$ROOT",
                            { position: "$$REMOVE" }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    position: 1,
                    user: 1
                }
            }
        ])
        .toArray()

    return result as UserRank[]
}

export async function getUserNames(db: Db, userIds: number[]) {
    const users = await db.collection('users')
        .find(
            { telegramId: { $in: userIds } },
            { projection: { telegramId: 1, firstName: 1 } }
        )
        .toArray();

    return users.reduce((acc, user) => {
        acc[user.telegramId] = user.firstName;
        return acc;
    }, {} as Record<number, string>);
}
