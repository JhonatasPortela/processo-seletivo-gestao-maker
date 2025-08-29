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
import { useCharactersList } from '../hooks/useCharacterList'

const CharacterList = () => {
  const {
    characters,
    isLoadingInitial,
    isLoadingMore,
    error,
    searchTerm,
    setSearchTerm,
    currentSearchTerm,
    hasMore,
    observerTarget,
    handleSearchClick,
    handleKeyPress,
    handleClearInput,
  } = useCharactersList()

  // Renderização Condicional para o estado de carregamento inicial.
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

  // Renderização principal do componente quando não está no estado de carregamento inicial.
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
          textAlign="center"
        >
          <Text fontSize="3xl" fontWeight="bold" mb={4} color="green.400">
            Rick and Morty Wiki
          </Text>

          {/* Seção de busca */}
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
                {/* Botão de limpar, visível apenas se houver algo digitado. */}
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

              {/* Botão de busca. */}
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
            <Text fontSize="sm" color="gray.400">
              Pressione "Enter" ou clique no ícone de busca para pesquisar.
            </Text>
          </VStack>

          {/* Renderização Condicional da Lista de Personagens / Mensagens */}
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

          {/* Exibe um spinner se estiver carregando mais personagens (scroll infinito). */}
          {isLoadingMore && (
            <Center mt={4}>
              <Spinner size="md" color="green.500" />
            </Center>
          )}

          {/* Exibe uma mensagem de erro se houver um erro. */}
          {error && (
            <Text fontSize="lg" color="red.500" mt={4}>
              {error}
            </Text>
          )}

          {/* Elemento de Gatilho para o Scroll Infinito: */}
          {hasMore &&
            characters.length > 0 &&
            !isLoadingInitial &&
            !isLoadingMore && (
              <Box ref={observerTarget} height="20px" mt={4}></Box>
            )}

          {/* Mensagem de Fim da Lista: */}
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
