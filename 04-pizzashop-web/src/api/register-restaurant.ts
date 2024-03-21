import { api } from '@/lib/axios'

export interface IRegisterRestaurantBody {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export async function registerRestaurant(data: IRegisterRestaurantBody) {
  await api.post('/restaurants', data)
}
