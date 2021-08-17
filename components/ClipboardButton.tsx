import { CheckIcon, CopyIcon } from '@chakra-ui/icons'
import { IconButton, IconButtonProps, useClipboard } from '@chakra-ui/react'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  link: string
}

export default function ClipboardButton({ link, ...rest }: Props) {
  const { hasCopied, onCopy } = useClipboard(link)

  return (
    <IconButton
      size='sm'
      aria-label='Copy to clipboard'
      icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
      colorScheme={hasCopied ? 'green' : 'blue'}
      onClick={onCopy}
      {...rest}
    />
  )
}
