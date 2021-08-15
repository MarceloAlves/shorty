import type { NextApiRequest, NextApiResponse } from 'next'
import { Link, Prisma } from '@prisma/client'
import * as DBService from '@services/db'
import { generateSlug } from '@utils'

interface ErrorResponse {
  code: number
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Link | ErrorResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }

  let result: Link

  try {
    const slug = await generateSlug()

    const linkData = {
      ...req.body,
      slug,
    }

    result = await DBService.createLink(linkData)

    if (!result) res.status(404).end('Not Found')

    res.status(201).json(result)
  } catch (error) {
    console.log(`🚀 ~ file: link.ts ~ line 36 ~ handler ~ error`, error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Duplicate slug
      // https://www.prisma.io/docs/reference/api-reference/error-reference/#p2002
      if (error.code === 'P2002') {
        res.status(409).json({
          code: 409,
          message: 'Slug already exists',
        })
      }
    }
  }
}
