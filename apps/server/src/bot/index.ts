import path from "node:path";
import { Bot, InputFile, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { FastifyInstance } from 'fastify'
import { getUserPurchasedGifts, sendGift } from "../db/gift";
import { getGifts } from "../db/gift-meta";
import type { GiftMeta } from "@crypto-bot-contest/types";
import { createOrUpdateUser } from "../db/user";

export function initializeBot(fastify: FastifyInstance) {
    const bot = new Bot(process.env.BOT_TOKEN)

    bot.command('start', async (ctx) => {
        const photos = await ctx.getUserProfilePhotos({ limit: 1 })
        let photoUrl: string | undefined

        if (photos.total_count > 0) {
            const photo = photos.photos[0][0]
            const file = await ctx.api.getFile(photo.file_id)
            photoUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`
        }

        await createOrUpdateUser(fastify.mongo.db, {
            telegramId: ctx.from!.id,
            firstName: ctx.from!.first_name,
            lastName: ctx.from!.last_name,
            username: ctx.from!.username,
            languageCode: ctx.from!.language_code,
            photoUrl
        })

        return ctx.replyWithPhoto(
            new InputFile(path.resolve(import.meta.dirname, 'assets/img.png')),
            {
                caption: "&#x1F381; Here you can buy and send gifts to your friends.",
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Open App', web_app: { url: process.env.WEB_APP_URL } }],
                    ],
                },
            }
        )
    })

    bot.on('inline_query', async (ctx) => {
        const telegramId = ctx.from.id

        const [purchasedGifts, gifts] = await Promise.all([
            getUserPurchasedGifts(fastify.mongo.db, telegramId),
            getGifts(fastify.mongo.db),
        ])

        
        if (purchasedGifts.length === 0) {
            await ctx.answerInlineQuery([], { button: { text: 'You don\'t have any gifts yet.' } })
            return
        }

        const giftsMeta = gifts.reduce<Record<number, GiftMeta>>((acc, gift) => {
            acc[gift.id] = gift
            return acc
        }, {})
        
        const purchasedGift = purchasedGifts.find((g) => g._id === ctx.inlineQuery.query)
        const filteredPurchasedGifts = purchasedGift ? [purchasedGift] : purchasedGifts
        
        const results = filteredPurchasedGifts.map((g) => InlineQueryResultBuilder
            .article(
                g._id,
                "Send Gift",
                {
                    description: `Send a gift of ${giftsMeta[g.giftId].name}`,
                    thumbnail_url: `${process.env.WEB_APP_URL}/img/icon-${giftsMeta[g.giftId].img}.png`,
                    reply_markup: new InlineKeyboard().text('Sending a gift...'),
                }).text('Sending a gift...'),
        )

        await ctx.answerInlineQuery(results)
    })

    bot.on('chosen_inline_result', async (ctx) => {
        const giftId = ctx.chosenInlineResult.result_id

        const sent = await sendGift(fastify.mongo.db, giftId)

        if (!sent) {
            await bot.api.editMessageTextInline(
                ctx.chosenInlineResult.inline_message_id!,
                'Something went wrong :(',
            )
            return
        }

        await bot.api.editMessageTextInline(
            ctx.chosenInlineResult.inline_message_id!,
            '&#x1F381; I have a <b>gift</b> for you! Tap the button below to open it.',
            {
                parse_mode: "HTML",
                reply_markup: new InlineKeyboard()
                    .url("Receive Gift", `${process.env.MINI_APP_URL}?startapp=receive-${giftId}`),
            },
        )
    })

    function sendReceivedGiftNotification(data: { telegramId: number, senderFirstName: string, giftName: string }) {
        bot.api.sendMessage(
            data.telegramId,
            `⚡ <b>${data.senderFirstName}</b> has given you the gift of <b>${data.giftName}</b>`,
            {
                parse_mode: "HTML",
                reply_markup: new InlineKeyboard().url("View Gift", process.env.MINI_APP_URL),
            },
        )
    }

    function sendGiftDeliveredNotification(data: { telegramId: number, receiverFirstName: string, giftName: string }) {
        bot.api.sendMessage(
            data.telegramId,
            `👌 <b>${data.receiverFirstName}</b> has received your gift of <b>${data.giftName}</b>`,
            {
                parse_mode: "HTML",
                reply_markup: new InlineKeyboard().url("Open App", process.env.MINI_APP_URL),
            },
        )
    }

    function sendGiftPurchasedNotification(data: { telegramId: number, giftName: string }) {
        bot.api.sendMessage(
            data.telegramId,
            `✅ You have purchased the gift of <b>${data.giftName}</b>`,
            {
                parse_mode: "HTML",
                reply_markup: new InlineKeyboard().url("Open App", process.env.MINI_APP_URL),
            },
        )
    }

    bot.start()

    return { sendReceivedGiftNotification, sendGiftDeliveredNotification, sendGiftPurchasedNotification }
}
