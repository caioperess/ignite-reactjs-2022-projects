import { http, HttpResponse } from 'msw'

import { IApproveOrderParams } from '../approve-order'

export const approveOrderMock = http.patch<IApproveOrderParams>(
  `/orders/:orderId/approve`,
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
