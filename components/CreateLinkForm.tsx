import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useAppContext } from '@providers/app'
import { FormEvent } from 'react'

export default function CreateLinkForm() {
  const [state, { updateInput, createLink }] = useAppContext()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    createLink()
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={2}>
        <FormControl id='url' isInvalid={!!state.context.errorMessage}>
          <FormLabel size='lg'>Enter a URL:</FormLabel>
          <Input name='url' size='lg' onChange={(e) => updateInput(e.target.value)} value={state.context.value} />
          <Box minHeight='29px'>
            <FormErrorMessage>{state.context.errorMessage}</FormErrorMessage>
          </Box>
        </FormControl>
        <Button colorScheme='blue' size='lg' type='submit' isLoading={state.matches('creatingLink')}>
          Shorten!
        </Button>
      </VStack>
    </form>
  )
}
