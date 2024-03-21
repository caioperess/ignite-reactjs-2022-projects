import { http, HttpResponse } from 'msw'

import { IGetDaysOrdersAmountResponse } from '../get-day-orders-amount'

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  IGetDaysOrdersAmountResponse
>('/metrics/day-orders-amount', async () => {
  return HttpResponse.json({ amount: 20, diffFromYesterday: -5 })
})
