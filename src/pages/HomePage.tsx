import { Box, Heading, Text, Center, Image } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Background from '../components/Background'

const HomePage = () => {
  return (
    <Background>
      <Navbar />

      <Center flex="1" pt="80px" pb="80px" px={4} flexDirection="column">
        <Image src={'src/assets/img/icegif-519.gif'}></Image>
        <Box
          p={8}
          bg="rgba(0, 0, 0, 0.75)"
          borderRadius="lg"
          textAlign="center"
          maxWidth="800px"
          width="100%"
          boxShadow="2xl"
          color="whiteAlpha.900"
        >
          <Heading as="h1" size="2xl" mb={4} color="green.400">
            Bem-vindo ao segundo desafio front-end!
          </Heading>
          <Text fontSize="lg" mb={6}>
            Explore todos os personagens de Rick and Morty, suas origens e
            aventuras através das dimensões.
          </Text>
          <Text fontSize="md" color="gray.300">
            Use a navegação acima para começar sua jornada!
          </Text>
        </Box>
      </Center>

      <Footer />
    </Background>
  )
}

export default HomePage
