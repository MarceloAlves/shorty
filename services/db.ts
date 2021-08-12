import prisma from '@lib/prismaClient'
import type { Link } from '@prisma/client'

const getLinkBySlug = async (slug: string) => {
  return prisma.link.findFirst({
    where: {
      slug,
    },
  })
}

const createLink = async (link: Link) => {
  return prisma.link.create({
    data: link,
  })
}

export { getLinkBySlug, createLink }
