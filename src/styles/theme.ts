import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    bg: {
      default: 'gray.100',
      _dark: 'gray.900',
    },
    text: {
      default: 'gray.800',
      _dark: 'whiteAlpha.900',
    },
    border: {
      default: 'green.400',
      _dark: 'green.500',
    },

    buttonDetails: {
      default: 'gray.400',
      _dark: 'gray.600',
    },

    greener: {
      default: 'green.800',
      _dark: 'green.400',
    },
  },
})

export default theme
