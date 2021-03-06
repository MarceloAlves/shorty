import { Box, Container, Grid, Heading } from '@chakra-ui/react'
import CreateLinkForm from '@components/CreateLinkForm'
import LinkHistory from '@components/LinkHistory'
import LinkResult from '@components/LinkResult'
import { useAppContext } from '@providers/app'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const [state] = useAppContext()

  return (
    <div>
      <Head>
        <title>Shorty</title>
        <meta name='description' content='Generate short links' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <Grid placeItems='center' minHeight='90vh' minWidth='100wh'>
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
            {state.hasTag('showingForm') && <CreateLinkForm />}
            {state.hasTag('showingResult') && <LinkResult />}
          </Box>

          <LinkHistory />
        </Container>
      </Grid>
    </div>
  )
}

export default Home
