import { useNavigate } from 'react-router-dom'
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
import { useCharacterDetail } from '../hooks/useCharacterDetail'
import {
  formatDate,
  translateGender,
  translateStatus,
} from '../utils/translations'
import { useDynamicColors } from '../hooks/useDynamicColors'

const CharacterDetail = () => {
  const navigate = useNavigate()
  const colors = useDynamicColors()
  const {
    character,
    loading,
    error,
    episodes,
    loadingEpisodes,
    episodesError,
  } = useCharacterDetail()

  const renderLoadingOrError = (message?: string) => (
    <Background>
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
          <Button onClick={() => navigate('/characters')} colorScheme={'green'}>
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
          bg={colors.boxBg}
          borderRadius="lg"
          maxWidth={{ base: '100%', sm: '450px', md: '550px', lg: '650px' }}
          width="100%"
          color={colors.text}
          textAlign="center"
          boxShadow="dark-lg"
        >
          <Button
            onClick={() => navigate('/characters')}
            colorScheme={'green'}
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
            borderColor={colors.green}
          />

          <Text fontSize="4xl" fontWeight="bold" mb={4} color={colors.green}>
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
              color={colors.green}
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
                    _hover={{ bg: 'gray.500' }}
                    w="100%"
                    borderBottom={'solid'}
                    borderColor={colors.green}
                    textAlign="left"
                  >
                    <Text
                      fontSize="md"
                      color={colors.text}
                      fontWeight="semibold"
                    >
                      {episode.name}
                    </Text>
                    <Text fontSize="sm" color={colors.text}>
                      {episode.episode} - {formatDate(episode.air_date)}
                    </Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text fontSize="md" color={colors.text}>
                Nenhum episódio encontrado para este personagem.
              </Text>
            )}
          </VStack>
        </Box>
      </Center>
    </Background>
  )
}

export default CharacterDetail
