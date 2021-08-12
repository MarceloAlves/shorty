const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const firstLink = await prisma.link.upsert({
    create: {
      url: 'https://github.com/marceloalves',
      slug: 'abc123',
    },
    update: {},
    where: {
      slug: 'abc123',
    },
  })

  const secondLink = await prisma.link.upsert({
    create: {
      url: 'https://marceloalves.dev',
      slug: 'xyz456',
    },
    update: {},
    where: {
      slug: 'xyz456',
    },
  })

  console.log({ firstLink, secondLink })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
