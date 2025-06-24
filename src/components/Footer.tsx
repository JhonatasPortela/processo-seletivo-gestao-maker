import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box
      as="footer"
      mt="auto"
      py={4}
      bg="gray.900"
      color="gray.400"
      textAlign="center"
      borderTop="1px solid"
      borderColor="green.500"
      width="100%"
      position="relative"
      bottom={0}
    >
      <Text fontSize="sm">Desenvolvido por Jhonatas Portela © 2025</Text>
    </Box>
  )
}

export default Footer
