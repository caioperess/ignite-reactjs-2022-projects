import { api } from '@/lib/axios'

export interface IUpdateProfileBody {
  name: string
  description: string | null
}

export async function updateProfile(data: IUpdateProfileBody) {
  await api.put('/profile', data)
}
