import {
  reatomAsync,
  withDataAtom,
  withCache,
  withAbort,
  withRetry,
  withStatusesAtom,
} from '@reatom/async'
import { withConcurrency } from '@reatom/effects'
import { onConnect } from '@reatom/hooks'
import { ctx } from './index'
import { currentUserAtom } from './user'
import { sleep } from '@/utils/sleep'
import * as api from '@/api/gift'
import * as invoiceApi from '@/api/invoice'
import { atom } from '@reatom/core'

export const fetchGifts = reatomAsync(async () => {
  const response = await api.getGifts()

  if (!response.ok) {
    // TODO: handle error
    return []
  }

  return response.result
}, 'fetchGifts').pipe(withDataAtom([]))

export const fetchOwnGifts = reatomAsync(async () => {
  const response = await api.getOwnGifts()

  if (!response.ok) {
    return []
  }

  return response.result
}, 'fetchOwnGifts').pipe(withDataAtom([]), withCache())

onConnect(fetchOwnGifts.dataAtom, fetchOwnGifts)

export function getGiftMetaById(id: number) {
  return ctx.get(fetchGifts.dataAtom).find(g => g.id === id)
}

export const buyGift = reatomAsync(async (ctx, giftId: number) => {
  await ctx.schedule(() => sleep(20))

  const userId = ctx.get(currentUserAtom)?.telegramId

  if (!userId) {
    return
  }

  const response = await api.buyGift({ giftId, userId })

  if (!response.ok) {
    throw response.error
  }

  ctx.schedule(fetchOwnGifts)
  ctx.schedule(fetchGifts)

  return response.result
}, 'buyGift').pipe(withConcurrency(), withStatusesAtom())

export const checkInvoiceStatus = reatomAsync(
  async (ctx, invoiceId: number) => {
    try {
      const response = await invoiceApi.checkInvoiceStatus({ invoiceId })

      if (!response.ok) {
        return null
      }

      return response.result.status
    } catch {
      return null
    }
  },
  'checkInvoiceStatus',
).pipe(withAbort(), withDataAtom(null), withStatusesAtom(), withRetry())

export const isInvoiceStatusCheckPending = atom(false)

export const runInvoiceStatusCheck = reatomAsync(
  async (ctx, invoiceId: number) => {
    isInvoiceStatusCheckPending(ctx, true)
    await checkInvoiceStatus(ctx, invoiceId)

    while (ctx.get(checkInvoiceStatus.dataAtom) === 'active') {
      // null, 'paid', 'expired' mean that we can stop checking
      await checkInvoiceStatus.retry(ctx)
      await ctx.schedule(() => sleep(1500))
    }

    isInvoiceStatusCheckPending(ctx, false)
  },
)
