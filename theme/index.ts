import { ComponentSingleStyleConfig, extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const Heading: ComponentSingleStyleConfig = {
  defaultProps: {
    size: '2xl',
    as: 'h1',
  },
  baseStyle: {
    textTransform: 'uppercase',
    marginBottom: 5,
  },
}

const Link: ComponentSingleStyleConfig = {
  baseStyle: {
    color: 'teal.500',
    textDecoration: 'underline',
  },
}

const theme = extendTheme({
  config,
  components: {
    Heading,
    Link,
  },
})

export default theme
