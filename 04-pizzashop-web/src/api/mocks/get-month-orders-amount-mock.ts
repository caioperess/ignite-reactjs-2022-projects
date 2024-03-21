import { http, HttpResponse } from 'msw'

import { IGetMonthOrdersAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  IGetMonthOrdersAmountResponse
>('/metrics/month-orders-amount', async () => {
  return HttpResponse.json({ amount: 20, diffFromLastMonth: -5 })
})
