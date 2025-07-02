import { useEffect, useState, useCallback, useRef } from 'react'
import { getCharacters } from '../services/api'
import { Character } from '../typings/character'
import {
  Box,
  Text,
  Image,
  Center,
  VStack,
  Input,
  Spinner,
} from '@chakra-ui/react'
import CharacterCard from '../components/CharacterCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Background from '../components/Background'

import imgLoading from '../assets/img/portal-rick-and-morty.gif'

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const fetchCharacters = useCallback(async (page: number, term: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCharacters(page, term)
      setCharacters((prevCharacters) =>
        page === 1 ? data.results : [...prevCharacters, ...data.results]
      )
      setHasMore(data.info.next !== null)
    } catch (erro) {
      console.error('Falha ao buscar personagens:', erro)
      setError('Erro ao carregar personagens. Tente novamente mais tarde.')
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCharacters(1, searchTerm)
  }, [searchTerm, fetchCharacters])

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && !loading && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1)
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 1.0,
      }
    )

    if (observerTarget.current) {
      observer.current.observe(observerTarget.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [loading, hasMore])

  useEffect(() => {
    if (currentPage > 1) {
      fetchCharacters(currentPage, searchTerm)
    }
  }, [currentPage, searchTerm, fetchCharacters])

  if (loading && characters.length === 0) {
    return (
      <Background>
        <Image
          src={imgLoading}
          alt="Carregando Portal"
          boxSize="150px"
          objectFit="contain"
        />
      </Background>
    )
  }

  if (error && characters.length === 0) {
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

          {characters.length > 0 ? (
            <CharacterCard characters={characters} />
          ) : (
            <Text fontSize="lg" color="gray.500">
              Nenhum personagem encontrado para "{searchTerm}".
            </Text>
          )}

          {hasMore && (
            <Box ref={observerTarget} height="20px" mt={4}>
              {loading && (
                <Center>
                  <Spinner size="md" color="green.500" />
                </Center>
              )}
            </Box>
          )}

          {!hasMore && characters.length > 0 && !loading && (
            <Text fontSize="md" color="gray.500" mt={4}>
              Você chegou ao fim da lista de personagens!
            </Text>
          )}
        </Box>
      </Center>
      <Footer />
    </Background>
  )
}

export default CharacterList
