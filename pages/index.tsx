import { CheckIcon, CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Fade,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  VStack,
} from '@chakra-ui/react'
import { joiResolver } from '@hookform/resolvers/joi'
import { Link } from '@prisma/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { urlFormSchema } from 'schemas/urlForm'

const Home: NextPage = () => {
  const host =
    typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3001'

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { touchedFields, errors },
  } = useForm({ defaultValues: { url: '' }, resolver: joiResolver(urlFormSchema), delayError: 500 })

  const { mutate, data, isSuccess, isLoading, reset } = useMutation(
    async (values: { url: string }): Promise<Link> => {
      const res = await fetch('/api/link', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = res.json()

      return data
    },
    {
      retry: 2,
      retryDelay: 500,
    }
  )
  const { hasCopied, onCopy, value } = useClipboard(`${host}/${data?.slug}`)

  const onSubmit = (values: { url: string }) => {
    mutate(values)
  }

  return (
    <div>
      <Head>
        <title>Shorty</title>
        <meta name='description' content='Generate short links' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Grid placeItems='center' minHeight='100vh' minWidth='100wh'>
        <Container textAlign='center'>
          <Heading>Shorty</Heading>
          <Box
            maxWidth='3xl'
            borderWidth='medium'
            borderStyle='dashed'
            borderColor='gray.300'
            paddingY={20}
            paddingX={10}
            borderRadius='3xl'
          >
            {!isSuccess && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={2}>
                  <FormControl id='url' isInvalid={!!touchedFields['url'] && !!errors['url']}>
                    <FormLabel size='lg'>Enter a URL:</FormLabel>
                    <Input size='lg' {...register('url')} />
                    <Box minHeight='29px'>
                      <FormErrorMessage>Must be a valid URL</FormErrorMessage>
                    </Box>
                  </FormControl>
                  <Button colorScheme='blue' size='lg' type='submit' isLoading={isLoading}>
                    Shorten!
                  </Button>
                </VStack>
              </form>
            )}

            {isSuccess && (
              <Fade in>
                <VStack spacing={2}>
                  <InputGroup size='lg'>
                    <Input size='lg' defaultValue={value} readOnly paddingRight='4.5rem' />
                    <InputRightElement width='3rem'>
                      <Button size='sm' height='8' onClick={onCopy} colorScheme={hasCopied ? 'green' : 'blue'}>
                        {hasCopied ? <CheckIcon /> : <CopyIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Button
                    size='lg'
                    onClick={() => {
                      reset()
                      resetForm()
                    }}
                  >
                    Generate New Link
                  </Button>
                </VStack>
              </Fade>
            )}
          </Box>
        </Container>
      </Grid>
    </div>
  )
}

export default Home
