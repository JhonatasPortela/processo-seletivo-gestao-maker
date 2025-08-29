import { Flex, SimpleGrid, Text, Image, Button, Icon } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { Character } from '../typings/character'
import { Link } from 'react-router-dom'

interface CharacterCardProps {
  characters: Character[]
}

const CharacterCard = ({ characters }: CharacterCardProps) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
      {characters.map((character) => (
        <Flex
          key={character.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.700"
          borderColor="gray.600"
          _hover={{ boxShadow: 'lg', transform: 'scale(1.1)' }}
          transition="all 0.2s"
          direction="column"
          justify="space-between"
          height="100%"
        >
          <Image
            src={character.image}
            alt={character.name}
            borderRadius="full"
            boxSize="120px"
            mx="auto"
            mb={4}
          />
          <Text fontSize="lg" fontWeight="500" color={'green.400'}>
            {character.name}
          </Text>
          <Button
            as={Link}
            to={`/character/${character.id}`}
            size="sm"
            marginTop={3}
            color="white"
            bg="gray.600"
            _hover={{ bg: 'gray.500' }}
          >
            <Icon as={FaSearch} mr={2} />
            Ver detalhes
          </Button>
        </Flex>
      ))}
    </SimpleGrid>
  )
}

export default CharacterCard
