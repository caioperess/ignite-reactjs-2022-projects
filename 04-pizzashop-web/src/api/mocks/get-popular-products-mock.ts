import { http, HttpResponse } from 'msw'

import { IGetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  IGetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    {
      product: 'Pizza 1',
      amount: 20,
    },
    {
      product: 'Pizza 2',
      amount: 17,
    },
    {
      product: 'Pizza 3',
      amount: 12,
    },
    {
      product: 'Pizza 4',
      amount: 8,
    },
    {
      product: 'Pizza 5',
      amount: 22,
    },
    {
      product: 'Pizza 6',
      amount: 15,
    },
    {
      product: 'Pizza 7',
      amount: 11,
    },
  ])
})
