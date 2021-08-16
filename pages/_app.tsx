import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProvider } from '@providers/app'
import ColorSchemeToggle from '@components/ColorSchemeToggle'

if (typeof Cypress !== 'undefined') {
  require('mocks')
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <ColorSchemeToggle />
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  )
}
export default MyApp
