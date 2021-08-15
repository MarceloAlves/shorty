import { CheckIcon, CopyIcon } from '@chakra-ui/icons'
import { IconButton, Td, Text, Tr, useClipboard } from '@chakra-ui/react'
import type { Link } from '@prisma/client'
import { generateShortLink } from '@utils/linkUtils'

interface Props {
  link: Link
}

export default function LinkHistoryRow({ link }: Props) {
  const shortenedLink = generateShortLink(link)
  const { hasCopied, onCopy } = useClipboard(shortenedLink)

  return (
    <Tr>
      <Td width='50px'>
        <IconButton
          size='sm'
          aria-label='Copy to clipboard'
          icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
          colorScheme={hasCopied ? 'green' : 'blue'}
          onClick={onCopy}
        />
      </Td>
      <Td>
        <Text isTruncated maxWidth='100px'>
          {link.slug}
        </Text>
      </Td>
      <Td>
        <Text isTruncated maxWidth='300px'>
          {link.url}
        </Text>
      </Td>
    </Tr>
  )
}
