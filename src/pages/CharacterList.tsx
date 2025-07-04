import { useEffect, useState, useCallback, useRef } from 'react'
import { getCharacters } from '../services/api'
import { Character } from '../typings/character'
import {
  Box,
  Text,
  Center,
  VStack,
  Input,
  Spinner,
  Image,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  HStack,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

import CharacterCard from '../components/CharacterCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Background from '../components/Background'
import imgLoading from '../assets/img/portal-rick-and-morty.gif'

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSearchTerm, setCurrentSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const fetchCharacters = useCallback(async (page: number, term: string) => {
    if (page === 1) {
      setIsLoadingInitial(true)
    } else {
      setIsLoadingMore(true)
    }
    setError(null)

    try {
      const data = await getCharacters(page, term)
      setCharacters((prevCharacters) =>
        page === 1 ? data.results : [...prevCharacters, ...data.results]
      )
      setHasMore(data.info.next !== null)
    } catch (erro) {
      console.error('Falha ao buscar personagens:', erro)
      setError(
        'Erro ao carregar personagens. Verifique sua conexão ou tente novamente mais tarde.'
      )
      setHasMore(false)
      setCharacters([])
    } finally {
      setIsLoadingInitial(false)
      setIsLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    setCharacters([])
    setHasMore(true)
    setError(null)
    fetchCharacters(1, currentSearchTerm)
  }, [currentSearchTerm, fetchCharacters])

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        const target =
          entries && entries.length > 0
            ? entries.find((entry) => entry.isIntersecting)
            : null
        if (
          target &&
          !isLoadingInitial &&
          !isLoadingMore &&
          hasMore &&
          characters.length > 0
        ) {
          setCurrentPage((prevPage) => prevPage + 1)
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
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
  }, [isLoadingInitial, isLoadingMore, hasMore, characters.length])

  useEffect(() => {
    if (currentPage > 1) {
      fetchCharacters(currentPage, currentSearchTerm)
    }
  }, [currentPage, currentSearchTerm, fetchCharacters])

  const handleSearchClick = () => {
    setCurrentSearchTerm(searchTerm)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handleClearInput = () => {
    setSearchTerm('')
    setCurrentSearchTerm('')
  }

  if (isLoadingInitial && characters.length === 0 && currentSearchTerm === '') {
    return (
      <Background>
        <Center flex="1" flexDirection="column">
          <Image
            src={imgLoading}
            alt="Carregando Portal"
            boxSize="150px"
            objectFit="contain"
          />
          <Text mt={4} color="green.400">
            Carregando personagens...
          </Text>
        </Center>
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
            <HStack maxWidth="500px" width="100%">
              <InputGroup flex="1">
                <Input
                  placeholder="Digite o nome do personagem"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  size="lg"
                  borderColor="green.500"
                  focusBorderColor="green.300"
                  _placeholder={{ color: 'gray.500' }}
                  color="whiteAlpha.900"
                  borderRightRadius={searchTerm ? 'none' : 'md'}
                />
                {searchTerm && (
                  <InputRightElement width="3rem">
                    <IconButton
                      h="1.75rem"
                      size="md"
                      icon={<Icon as={CloseIcon} />}
                      aria-label="Limpar busca"
                      onClick={handleClearInput}
                      variant="ghost"
                      color="gray.400"
                      _hover={{ bg: 'transparent', color: 'red.400' }}
                    />
                  </InputRightElement>
                )}
              </InputGroup>

              <IconButton
                h="3rem"
                width="3rem"
                minW="auto"
                icon={<SearchIcon />}
                onClick={handleSearchClick}
                aria-label="Buscar personagem"
                bg="green.400"
                color="white"
                borderRadius="md"
                ml={2}
                _hover={{ bg: 'green.600', transform: 'scale(1.05)' }}
              />
            </HStack>
          </VStack>

          {characters.length > 0 ? (
            <CharacterCard characters={characters} />
          ) : (
            !isLoadingInitial &&
            !isLoadingMore &&
            !error &&
            currentSearchTerm !== '' && (
              <Text fontSize="lg" color="gray.500">
                Nenhum personagem encontrado para "{currentSearchTerm}".
              </Text>
            )
          )}

          {isLoadingMore && (
            <Center mt={4}>
              <Spinner size="md" color="green.500" />
            </Center>
          )}

          {error && (
            <Text fontSize="lg" color="red.500" mt={4}>
              {error}
            </Text>
          )}

          {hasMore &&
            characters.length > 0 &&
            !isLoadingInitial &&
            !isLoadingMore && (
              <Box ref={observerTarget} height="20px" mt={4}></Box>
            )}

          {!hasMore &&
            characters.length > 0 &&
            !isLoadingInitial &&
            !isLoadingMore && (
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
