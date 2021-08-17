import { Td, Text, Tr } from '@chakra-ui/react'
import type { Link } from '@prisma/client'
import { generateShortLink } from '@utils/linkUtils'
import ClipboardButton from './ClipboardButton'

interface Props {
  link: Link
}

export default function LinkHistoryRow({ link }: Props) {
  const shortenedLink = generateShortLink(link)

  return (
    <Tr>
      <Td width='50px'>
        <ClipboardButton link={shortenedLink} />
      </Td>
      <Td>
        <Text isTruncated>{link.slug}</Text>
      </Td>
      <Td>
        <Text isTruncated maxWidth={{ base: 30, sm: 150, md: 250, lg: 300 }}>
          {link.url.replace(/^https?:\/\//, '')}
        </Text>
      </Td>
    </Tr>
  )
}
