import { http, HttpResponse } from 'msw'

import { IGetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  IGetManagedRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: '149bd5f7-ff7a-5522-a556-841521d8a7b7',
    name: 'Alvin Saunders',
    description: 'vote build mad pipe scale seen chance winter color  word',
    managerId: 'fc839dae-ac5d-5bcc-9a5d-8495f2137997',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  })
})
