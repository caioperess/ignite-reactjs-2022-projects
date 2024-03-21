import { http, HttpResponse } from 'msw'

import { IGetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, IGetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: '149bd5f7-ff7a-5522-a556-841521d8a7b7',
      name: 'Alvin Saunders',
      email: 'bera@vagubbug.be',
      phone: '14778541455',
      role: 'manager',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })
  },
)
