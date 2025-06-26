import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCharacterById } from '../services/api'
import { Character } from '../typings/character'
import {
  Box,
  Text,
  Center,
  VStack,
  Image,
  Badge,
  Button,
  Icon,
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

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const renderLoadingOrError = (message?: string) => (
    <Background>
      <Navbar />
      <Center flex="1" flexDirection="column" pt="80px" pb="80px">
        {loading && <Image src={imgLoading} />}
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
          maxWidth="600px"
          width="150%"
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

          <VStack spacing={3} align="flex-start" mx="auto" maxWidth="300px">
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

            <Text fontSize="lg">
              <Text as="span" fontWeight="bold">
                Origem:
              </Text>{' '}
              {character.origin.name}
            </Text>

            <Text fontSize="lg">
              <Text as="span" fontWeight="bold">
                Última Localização:
              </Text>{' '}
              {character.location.name}
            </Text>

            <Text
              fontSize="xl"
              fontWeight="bold"
              mt={6}
              mb={2}
              color="green.300"
            >
              Apareceu em:
            </Text>
            <VStack spacing={1} align="flex-start">
              {character.episode.map((episodeUrl) => {
                const episodeNumberMatch = episodeUrl.match(/\/(\d+)$/)
                const episodeNumber = episodeNumberMatch
                  ? episodeNumberMatch[1]
                  : 'N/A'
                return (
                  <Text key={episodeUrl} fontSize="md" color="gray.300">
                    Episódio {episodeNumber}
                  </Text>
                )
              })}
            </VStack>
          </VStack>
        </Box>
      </Center>
      <Footer />
    </Background>
  )
}

export default CharacterDetail
