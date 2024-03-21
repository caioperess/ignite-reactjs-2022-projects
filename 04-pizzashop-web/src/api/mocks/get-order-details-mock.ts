import { http, HttpResponse } from 'msw'

import {
  IGetOrderDetailsParams,
  IGetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  IGetOrderDetailsParams,
  never,
  IGetOrderDetailsResponse
>('/orders/:orderId', async ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'Christina Scott',
      email: 'pucuhme@gihipvow.co',
      phone: '14774125444',
    },
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: {
          name: 'Pizza Peperroni',
        },
        quantity: 2,
      },
      {
        id: 'order-item-2',
        priceInCents: 4000,
        product: {
          name: 'Pizza Marguerita',
        },
        quantity: 2,
      },
    ],
    status: 'pending',
    totalInCents: 10000,
    createdAt: new Date().toISOString(),
  })
})
