import { http, HttpResponse } from 'msw'

import { ICancelOrderParams } from '../cancel-orders'

export const cancelOrderMock = http.patch<ICancelOrderParams>(
  `/orders/:orderId/cancel`,
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
