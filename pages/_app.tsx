import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { useState } from 'react'
import { AppProvider } from '@providers/app'
import ColorSchemeToggle from '@components/ColorSchemeToggle'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ColorSchemeToggle />
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </AppProvider>
  )
}
export default MyApp
