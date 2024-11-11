import type { Db } from "mongodb";
import type { AppEvent, AppEventWithUserNames } from "@crypto-bot-contest/types";
import { getUserNames } from "./user";

const EVENTS_COLLECTION = 'events';

export async function logEvent(db: Db, event: Omit<AppEvent, '_id'>) {
    await db.collection<Omit<AppEvent, '_id'>>(EVENTS_COLLECTION).insertOne(event);
}

export async function getUserEvents(db: Db, telegramId: number): Promise<Array<{ date: string, events: AppEventWithUserNames[] }>> {
    const events = await db.collection<AppEvent>(EVENTS_COLLECTION)
        .find({
            $or: [{ senderId: telegramId }, { receiverId: telegramId }]
        })
        .sort({ date: -1 })
        .toArray();

    const userIds = new Set<number>()

    events.forEach(event => {
        userIds.add(event.senderId)
        if (event.type === 'gift-send') {
            userIds.add(event.receiverId)
        }
    })

    const userNames = await getUserNames(db, Array.from(userIds));

    const eventsWithNames = events.map(event => ({
        ...event,
        senderFirstName: userNames[event.senderId],
        receiverFirstName: event.type === 'gift-send' ? userNames[event.receiverId] : undefined
    }));

    return groupEventsByDate(eventsWithNames);
}

export async function getGiftEvents(db: Db, giftId: number): Promise<AppEventWithUserNames[]> {
    const events = await db.collection<AppEvent>(EVENTS_COLLECTION)
        .find({ giftId })
        .sort({ date: -1 })
        .limit(10)
        .toArray();

    const userIds = new Set<number>()

    events.forEach(event => {
        userIds.add(event.senderId)
        if (event.type === 'gift-send') {
            userIds.add(event.receiverId)
        }
    })

    const userNames = await getUserNames(db, Array.from(userIds));

    return events.map(event => ({
        ...event,
        senderFirstName: userNames[event.senderId],
        receiverFirstName: event.type === 'gift-send' ? userNames[event.receiverId] : undefined
    }));
}

function groupEventsByDate(events: AppEventWithUserNames[]): Array<{ date: string, events: AppEventWithUserNames[] }> {
    const groupedEvents = events.reduce((groups, event) => {
        const date = event.date.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(event);
        return groups;
    }, {} as Record<string, AppEventWithUserNames[]>);

    return Object.entries(groupedEvents)
        .map(([date, events]) => ({
            date,
            events: events.sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
        }))
        .sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
}
