import { PrismaClient } from '@prisma/client'

/**
 * Prevent multiple instances of Prisma Client in development
 * https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */

declare const global: NodeJS.Global & { prisma?: PrismaClient }

const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
