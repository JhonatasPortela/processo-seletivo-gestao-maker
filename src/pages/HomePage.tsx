import { Box, Heading, Text, Center, Image } from '@chakra-ui/react'
import Background from '../components/Background'
import imgHomeGif from '../assets/img/icegif-519.gif'
import { useDynamicColors } from '../hooks/useDynamicColors'

const HomePage = () => {
  const colors = useDynamicColors()
  return (
    <Background>
      <Center flex="1" pt="80px" pb="80px" px={4} flexDirection="column">
        <Image src={imgHomeGif} />
        <Box
          p={8}
          bg={colors.boxBg}
          borderRadius="lg"
          textAlign="center"
          maxWidth="800px"
          width="100%"
          color="whiteAlpha.900"
        >
          <Heading as="h1" size="2xl" mb={4} color={colors.green}>
            Bem-vindo ao segundo desafio front-end!
          </Heading>
          <Text fontSize="lg" mb={6} color={colors.text}>
            Explore todos os personagens de Rick and Morty, suas origens e
            aventuras através das dimensões.
          </Text>
          <Text fontSize="md" color={colors.green}>
            Use a navegação acima para começar sua jornada!
          </Text>
        </Box>
      </Center>
    </Background>
  )
}

export default HomePage
