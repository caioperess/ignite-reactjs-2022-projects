import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await auth(req, res)

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio,
    },
  })

  return res.status(204).end()
}
