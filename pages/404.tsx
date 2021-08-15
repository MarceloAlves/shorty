import { Grid, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <Head>
        <title>Shorty</title>
        <meta name='description' content='Generate short links' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <Grid placeItems='center' minHeight='90vh' minWidth='100wh'>
        <VStack>
          <Heading>Uh Oh</Heading>
          <Text>We&apos;ve looked everywhere and can&apos;t seem to find that link</Text>
          <Link href='/' passHref>
            <ChakraLink>Create a new one instead?</ChakraLink>
          </Link>
        </VStack>
      </Grid>
    </div>
  )
}
