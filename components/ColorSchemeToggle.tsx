import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, IconButton, useColorMode } from '@chakra-ui/react'

export default function ColorSchemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex paddingY={1} paddingRight={2} justifyContent='flex-end'>
      <IconButton
        aria-label='Toggle Color Scheme'
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}
