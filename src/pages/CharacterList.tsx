import { useEffect, useState } from 'react'
import { getAllCharacters } from '../services/api'
import { Character } from '../typings/character'
import { Box, Text, Image, Center, VStack, Input } from '@chakra-ui/react'
import CharacterCard from '../components/CharacterCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Background from '../components/Background'

const CharacterList = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchAllCharacters = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllCharacters()
        setAllCharacters(data)
        setDisplayedCharacters(data)
      } catch (erro) {
        console.error('Falha ao buscar os personagens:', erro)
      } finally {
        setLoading(false)
      }
    }

    fetchAllCharacters()
  }, [])

  useEffect(() => {
    const filteredCharacters = allCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setDisplayedCharacters(filteredCharacters)
  }, [searchTerm, allCharacters])

  if (loading) {
    return (
      <Background>
        <Image src={'src/assets/img/portal-rick-and-morty.gif'} />
      </Background>
    )
  }

  if (error) {
    return (
      <Background>
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Background>
    )
  }

  return (
    <Background>
      <Navbar />
      <Center flex="1" pt="80px" pb="80px" px={4} flexDirection="column">
        <Box
          p={5}
          bg="rgba(0, 0, 0, 0.7)"
          borderRadius="lg"
          maxWidth="1000px"
          width="100%"
          color="green.400"
          textAlign="center"
        >
          <Text fontSize="3xl" fontWeight="bold" mb={4} color="green.400">
            Rick and Morty Wiki
          </Text>
          <VStack spacing={4} mb={8}>
            <Input
              placeholder="Buscar personagem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              maxWidth="500px"
              alignSelf="center"
              borderColor="green.500"
              focusBorderColor="green.300"
              _placeholder={{ color: 'gray.500' }}
              color="whiteAlpha.900"
            />
          </VStack>

          {displayedCharacters.length > 0 ? (
            <CharacterCard characters={displayedCharacters} />
          ) : (
            <Text fontSize="lg" color="gray.500">
              Nenhum personagem encontrado para "{searchTerm}".
            </Text>
          )}
        </Box>
      </Center>
      <Footer />
    </Background>
  )
}

export default CharacterList
