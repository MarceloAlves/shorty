import { Button, Fade, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useAppContext } from '@providers/app'
import { generateShortLink } from '@utils/linkUtils'
import ClipboardButton from './ClipboardButton'

export default function LinkResult() {
  const [state, { restart }] = useAppContext()

  const shortenedLink = generateShortLink(state.context.linkHistory[0])

  return (
    <Fade in>
      <VStack spacing={2}>
        <InputGroup size='lg'>
          <Input size='lg' defaultValue={shortenedLink} readOnly paddingRight='4.5rem' />
          <InputRightElement width='3rem'>
            <ClipboardButton link={shortenedLink} />
          </InputRightElement>
        </InputGroup>

        <Button size='lg' onClick={restart}>
          Generate New Link
        </Button>
      </VStack>
    </Fade>
  )
}
