import { CheckIcon, CopyIcon } from '@chakra-ui/icons'
import { Button, Fade, Input, InputGroup, InputRightElement, useClipboard, VStack } from '@chakra-ui/react'
import { useAppContext } from '@providers/app'

export default function LinkResult() {
  const [state, { restart }] = useAppContext()

  const host =
    typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3001'

  const shortenedLink = `${host}/${state.context.linkHistory[0].slug}`

  const { onCopy, hasCopied } = useClipboard(shortenedLink)

  return (
    <Fade in>
      <VStack spacing={2}>
        <InputGroup size='lg'>
          <Input size='lg' defaultValue={shortenedLink} readOnly paddingRight='4.5rem' />
          <InputRightElement width='3rem'>
            <Button size='sm' height='8' onClick={onCopy} colorScheme={hasCopied ? 'green' : 'blue'}>
              {hasCopied ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button size='lg' onClick={restart}>
          Generate New Link
        </Button>
      </VStack>
    </Fade>
  )
}
