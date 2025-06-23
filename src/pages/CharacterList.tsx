import { useEffect, useState } from 'react'
import { getAllCharacters } from '../services/api'
import { Character } from '../typings/character'
import { Box, Text, Spinner, Center, VStack, Flex } from '@chakra-ui/react'

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllCharacters = async () => {
      setLoading(true)
      setError(null)
      try {
        const allData = await getAllCharacters()
        setCharacters(allData)
      } catch (erro) {
        console.error('Falha ao buscar todos os personagens:', erro)
      } finally {
        setLoading(false)
      }
    }

    fetchAllCharacters()
  }, [])

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="green.500" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Center>
    )
  }

  return (
    <Flex
      bgImage="src/assets/img/HuGGeENt6kGyixe3hT9tnY-650-80.jpg.webp"
      bgPosition="center"
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
    >
      <Box
        p={5}
        bg="rgba(0, 0, 0, 0.7)"
        borderRadius="lg"
        maxWidth="800px"
        width="100%"
        color="green.400"
        textAlign="center"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={4} color="green.400">
          Todos os Personagens de Rick e Morty:
        </Text>
        <VStack spacing={3} align="stretch">
          {characters.length > 0 ? (
            characters.map((character) => (
              <Box
                key={character.id}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                bg="gray.700"
                borderColor="gray.600"
              >
                <Text fontSize="lg">{character.name}</Text>
              </Box>
            ))
          ) : (
            <Text fontSize="lg">Nenhum personagem encontrado.</Text>
          )}
        </VStack>
      </Box>
    </Flex>
  )
}

export default CharacterList
