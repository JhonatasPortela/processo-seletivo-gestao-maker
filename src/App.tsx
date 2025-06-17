import { Box, Heading, Text, Center } from "@chakra-ui/react";

function App() {
  return (
    <Center minH="100vh" bgAttachment="fixed" bgImage="url(src/assets/img/wallpapersden.com_rick-and-morty-on-the-run_3840x2160.jpg)" bgSize="cover" bgRepeat="no-repeat" bgPosition="center"  >
      <Box p={350} bg="surface.light" borderRadius="lg" boxShadow="lg" textAlign="center"  >
        <Heading as="h1" size="xl" mb={4} color="brand.primary">
          Rick and Morty Wiki
        </Heading>
        <Text fontSize="lg" color="brand.secondary">
          Rick and Morty API é uma API pública que fornece dados sobre os personagens, episódios e locais do universo de Rick and Morty.
        </Text>
      </Box>
    </Center>
  );
}

export default App;
