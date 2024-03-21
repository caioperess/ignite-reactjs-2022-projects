import { http, HttpResponse } from 'msw'

import { IGetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  IGetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', async () => {
  return HttpResponse.json([
    {
      date: '11/03/2024',
      receipt: 2000,
    },
    {
      date: '12/03/2024',
      receipt: 1750,
    },
    {
      date: '13/03/2024',
      receipt: 1200,
    },
    {
      date: '14/03/2024',
      receipt: 800,
    },
    {
      date: '15/03/2024',
      receipt: 2200,
    },
    {
      date: '16/03/2024',
      receipt: 1500,
    },
    {
      date: '17/03/2024',
      receipt: 1170,
    },
  ])
})
