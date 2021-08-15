import type { Link } from '@prisma/client'

export const generateShortLink = (link: Link) => {
  const host =
    typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3001'

  return `${host}/${link.slug}`
}
