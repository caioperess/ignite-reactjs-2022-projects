import { api } from '@/lib/axios'

export interface IGetManagedRestaurantResponse {
  name: string
  id: string
  createdAt: string | null
  updatedAt: string | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<IGetManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return response.data
}
