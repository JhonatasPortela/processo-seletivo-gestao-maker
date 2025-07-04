import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCharacterById, getEpisodeById } from '../services/api'
import { Character, Episode } from '../typings/character'
import {
  Box,
  Text,
  Center,
  VStack,
  Image,
  Badge,
  Button,
  Icon,
  Spinner,
} from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Background from '../components/Background'
import imgLoading from '../assets/img/portal-rick-and-morty.gif'

const translateStatus = (status: 'Alive' | 'Dead' | 'unknown'): string => {
  switch (status) {
    case 'Alive':
      return 'Vivo'
    case 'Dead':
      return 'Morto'
    case 'unknown':
      return 'Desconhecido'
    default:
      return status
  }
}

const translateGender = (
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
): string => {
  switch (gender) {
    case 'Female':
      return 'Feminino'
    case 'Male':
      return 'Masculino'
    case 'Genderless':
      return 'Sem Gênero'
    case 'unknown':
      return 'Desconhecido'
    default:
      return gender
  }
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loadingEpisodes, setLoadingEpisodes] = useState(true)
  const [episodesError, setEpisodesError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (id) {
        setLoading(true)
        setError(null)
        try {
          const data = await getCharacterById(parseInt(id))
          setCharacter(data)
        } catch (erro) {
          console.error(`Falha ao buscar detalhes do personagem ${id}:`, erro)
          setError('Erro ao buscar personagem, tente novamente mais tarde.')
          setCharacter(null)
        } finally {
          setLoading(false)
        }
      } else {
        setError('ID do personagem não fornecido.')
        setLoading(false)
      }
    }

    fetchCharacterDetails()
  }, [id])

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      if (character && character.episode && character.episode.length > 0) {
        setLoadingEpisodes(true)
        setEpisodesError(null)
        try {
          const episodeIds = character.episode
            .map((url) => {
              const match = url.match(/\/(\d+)$/)
              return match ? parseInt(match[1]) : null
            })
            .filter((id) => id !== null) as number[]

          const fetchedEpisodes = await Promise.all(
            episodeIds.map((episodeId) => getEpisodeById(episodeId))
          )
          setEpisodes(fetchedEpisodes)
        } catch (err) {
          console.error('Erro ao buscar detalhes dos episódios:', err)
          setEpisodesError(
            'Não foi possível carregar os detalhes dos episódios.'
          )
          setEpisodes([])
        } finally {
          setLoadingEpisodes(false)
        }
      } else if (character) {
        setLoadingEpisodes(false)
        setEpisodes([])
      }
    }

    if (character && character.episode) {
      fetchEpisodeDetails()
    }
  }, [character])

  const renderLoadingOrError = (message?: string) => (
    <Background>
      <Navbar />
      <Center flex="1" flexDirection="column" pt="80px" pb="80px">
        {loading && (
          <Image
            src={imgLoading}
            alt="Carregando Portal"
            boxSize="150px"
            objectFit="contain"
          />
        )}

        {error && (
          <Text fontSize="xl" color="red.500" mb={4}>
            {error}
          </Text>
        )}

        {!loading && !character && !error && (
          <Text fontSize="xl" color="red.500" mb={4}>
            {message || 'Personagem não encontrado.'}
          </Text>
        )}

        {!loading && (error || !character) && (
          <Button onClick={() => navigate('/characters')} colorScheme="green">
            Voltar para a lista
          </Button>
        )}
      </Center>
      <Footer />
    </Background>
  )

  if (loading) {
    return renderLoadingOrError()
  }
  if (error) {
    return renderLoadingOrError(error)
  }
  if (!character) {
    return renderLoadingOrError('Personagem não encontrado.')
  }

  return (
    <Background>
      <Navbar />
      <Center flex="1" pt="80px" pb="80px" px={4} flexDirection="column">
        <Box
          p={8}
          bg="rgba(0, 0, 0, 0.8)"
          borderRadius="lg"
          maxWidth={{ base: '100%', sm: '450px', md: '550px', lg: '650px' }}
          width="100%"
          color="whiteAlpha.900"
          textAlign="center"
          boxShadow="dark-lg"
        >
          <Button
            onClick={() => navigate('/characters')}
            colorScheme="green"
            size="sm"
            leftIcon={<Icon as={FaArrowLeft} />}
            mb={4}
            alignSelf="flex-start"
          >
            Voltar
          </Button>

          <Image
            src={character.image}
            alt={character.name}
            borderRadius="full"
            boxSize="200px"
            mx="auto"
            mb={6}
            border="4px solid"
            borderColor="green.400"
          />

          <Text fontSize="4xl" fontWeight="bold" mb={4} color="green.400">
            {character.name}
          </Text>

          <VStack
            spacing={3}
            align="flex-start"
            mx="auto"
            maxWidth="unset"
            w="100%"
          >
            <Text fontSize="lg">
              <Text as="span" fontWeight="bold">
                Status:
              </Text>{' '}
              <Badge
                colorScheme={
                  character.status === 'Alive'
                    ? 'green'
                    : character.status === 'Dead'
                      ? 'red'
                      : 'gray'
                }
                variant="solid"
                px={2}
                py={1}
                borderRadius="md"
              >
                {translateStatus(character.status)}
              </Badge>
            </Text>
            <Text fontSize="lg">
              <Text as="span" fontWeight="bold">
                Espécie:
              </Text>{' '}
              {character.species}
            </Text>
            {character.type && character.type !== '' && (
              <Text fontSize="lg">
                <Text as="span" fontWeight="bold">
                  Tipo:
                </Text>{' '}
                {character.type}
              </Text>
            )}
            <Text fontSize="lg">
              <Text as="span" fontWeight="bold">
                Gênero:
              </Text>{' '}
              {translateGender(character.gender)}
            </Text>

            <Text
              fontSize="lg"
              display="flex"
              flexDirection="row"
              textAlign="left"
              w="100%"
            >
              <Text as="span" fontWeight="bold" mr={1} whiteSpace="nowrap">
                Origem:
              </Text>{' '}
              <Text as="span">{character.origin.name}</Text>
            </Text>

            <Text
              fontSize="lg"
              display="flex"
              flexDirection="row"
              textAlign="left"
              w="100%"
            >
              <Text as="span" fontWeight="bold" mr={1} whiteSpace="nowrap">
                Última Localização:
              </Text>{' '}
              <Text as="span">{character.location.name}</Text>
            </Text>

            <Text
              fontSize="xl"
              fontWeight="bold"
              mt={6}
              mb={2}
              color="green.300"
              textAlign="left"
              w="100%"
            >
              Apareceu em {character.episode.length} episódios:
            </Text>

            {loadingEpisodes ? (
              <Center w="100%">
                <Spinner size="sm" color="green.300" />
              </Center>
            ) : episodesError ? (
              <Text fontSize="md" color="red.400">
                {episodesError}
              </Text>
            ) : episodes.length > 0 ? (
              <VStack spacing={1} align="flex-start" w="100%">
                {episodes.map((episode) => (
                  <Box
                    key={episode.id}
                    py={1}
                    px={2}
                    borderRadius="md"
                    _hover={{ bg: 'gray.600' }}
                    w="100%"
                    borderBottom={'solid'}
                    borderColor={'green.400'}
                    textAlign="left"
                  >
                    <Text
                      fontSize="md"
                      color="whiteAlpha.800"
                      fontWeight="semibold"
                    >
                      {episode.name}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {episode.episode} - {formatDate(episode.air_date)}
                    </Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text fontSize="md" color="gray.400">
                Nenhum episódio encontrado para este personagem.
              </Text>
            )}
          </VStack>
        </Box>
      </Center>
      <Footer />
    </Background>
  )
}

export default CharacterDetail
