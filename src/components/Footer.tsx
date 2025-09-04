import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { useThemeColors } from '../hooks/useThemeColors'

const Footer = () => {
  const colors = useThemeColors()
  return (
    <Box
      as="footer"
      mt="auto"
      py={4}
      bg={useColorModeValue(colors.bg.light, colors.bg.dark)}
      color={useColorModeValue(colors.text.light, colors.text.dark)}
      textAlign="center"
      borderTop="1px solid"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      width="100%"
      position="relative"
      bottom={0}
    >
      <Text fontSize="sm">Desenvolvido por Jhonatas Portela © 2025</Text>
    </Box>
  )
}

export default Footer
