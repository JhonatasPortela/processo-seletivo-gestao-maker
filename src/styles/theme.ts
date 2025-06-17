import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  // Crie aqui seu tema customizado do ChakraUI
  colors: {
    brand: {
       primary: '#d10039',
       secondary: '#2a252c'
    },
    surface: {
      light: 'rgba(217, 217, 217, 0.95)',
      dark: 'rgba(30, 30, 38, 0.95)',
    }
  },
})

export default theme
