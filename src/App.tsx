import { Box, Heading, Text, Center } from "@chakra-ui/react";

function App() {
  return (
    <Center minH="100vh" bg="surface.dark">
      <Box p={8} bg="surface.light" borderRadius="lg" boxShadow="lg" textAlign="center">
        <Heading as="h1" size="xl" mb={4} color="brand.primary">
          Bem-vindo!
        </Heading>
        <Text fontSize="lg" color="brand.secondary">
          Rick and Morty API é uma API pública que fornece dados sobre os personagens, episódios e locais do universo de Rick and Morty.
        </Text>
      </Box>
    </Center>
  );
}

export default App;
