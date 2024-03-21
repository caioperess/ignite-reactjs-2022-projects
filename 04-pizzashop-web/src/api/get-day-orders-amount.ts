import { api } from '@/lib/axios'

export interface IGetDaysOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<IGetDaysOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  )

  return response.data
}
