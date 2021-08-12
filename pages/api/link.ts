import type { NextApiRequest, NextApiResponse } from 'next'
import { Link, Prisma } from '@prisma/client'
import * as DBService from '@services/db'
import { generateSlug } from '@utils'

interface ErrorResponse {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Link | ErrorResponse>) {
  if (req.method === 'POST') {
    try {
      const linkData = {
        ...req.body,
        slug: await generateSlug(),
      }

      const result = await DBService.createLink(linkData)

      res.status(201).json(result)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Duplicate slug
        // https://www.prisma.io/docs/reference/api-reference/error-reference/#p2002
        if (error.code === 'P2002') {
          res.status(409).json({
            message: 'Slug already exists',
          })
        }
      }
    }
  }

  // 405: Method Not Allowed
  res.status(405).end()
}
