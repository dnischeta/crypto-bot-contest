import type { FastifyInstance } from "fastify";
import { createGifts } from '../db/gift-meta'

const GIFTS = [
    {
        "id": 1,
        "name": "Delicious Cake",
        "totalQty": 5,
        "soldQty": 4,
        "img": "gift-delicious-cake" as const,
        "price": {
            "amount": 0.1,
            "asset": "TON" as const
        },
        "accentColor": "#FE9F41"
    },
    {
        "id": 2,
        "name": "Green star",
        "totalQty": 5,
        "soldQty": 0,
        "img": "gift-green-star" as const,
        "price": {
            "amount": 0.15,
            "asset": "TON" as const
        },
        "accentColor": "#46D100"
    },
    {
        "id": 3,
        "name": "Red star",
        "totalQty": 5,
        "soldQty": 2,
        "img": "gift-red-star" as const,
        "price": {
            "amount": 0.25,
            "asset": "TON" as const
        },
        "accentColor": "#FF4747"
    },
    {
        "id": 4,
        "name": "Blue star",
        "totalQty": 5,
        "soldQty": 5,
        "img": "gift-blue-star" as const,
        "price": {
            "amount": 1,
            "asset": "USDT" as const
        },
        "accentColor": "#007Aff"
    },
    {
        "id": 5,
        "name": "Blue star",
        "totalQty": 5,
        "soldQty": 0,
        "img": "gift-blue-star" as const,
        "price": {
            "amount": 0.11,
            "asset": "USDT" as const
        },
        "accentColor": "#007Aff"
    },
    {
        "id": 6,
        "name": "Delicious Cake #2",
        "totalQty": 5,
        "soldQty": 0,
        "img": "gift-delicious-cake" as const,
        "price": {
            "amount": 0.1,
            "asset": "USDT" as const
        },
        "accentColor": "#FE9F41"
    },
    {
        "id": 7,
        "name": "Green star #7",
        "totalQty": 5,
        "soldQty": 0,
        "img": "gift-green-star" as const,
        "price": {
            "amount": 0.1,
            "asset": "USDT" as const
        },
        "accentColor": "#46D100"
    },
]

export function setupSeedDb(fastify: FastifyInstance) {
    fastify.addHook('onListen', async () => {
        await createGifts(fastify.mongo.db, GIFTS)
    })
}