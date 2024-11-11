import { request } from '@/utils/request'
import type {
  ApiGetInvoiceStatusRequest,
  ApiGetInvoiceStatusResponse,
} from '@crypto-bot-contest/types'

const paths = {
  checkStatus: (invoiceId: number) => `/gift/check-invoice/${invoiceId}`,
}

export function checkInvoiceStatus(params: ApiGetInvoiceStatusRequest) {
  return request<ApiGetInvoiceStatusResponse>(
    paths.checkStatus(params.invoiceId),
  )
}
