import { useEffect, useState } from 'react'
import { getAllCharacters } from '../services/api'
import { Character } from '../typings/character'
import { Box, Text, Image, Center } from '@chakra-ui/react'
import CharacterCard from '../components/CharacterCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Background from '../components/Background'

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

          <CharacterCard characters={characters} />
        </Box>
      </Center>
      <Footer />
    </Background>
  )
}

export default CharacterList
