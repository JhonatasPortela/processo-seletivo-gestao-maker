import { Box, SimpleGrid, Text, Image, Button, Icon } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

const CharacterCard = ({ characters }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
      {characters.length > 0 ? (
        characters.map((character) => (
          <Box
            key={character.id}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            bg="gray.700"
            borderColor="gray.600"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.1)' }}
            transition="all 0.2s"
          >
            <Image
              src={character.image}
              alt={character.name}
              borderRadius="full"
              boxSize="120px"
              mx="auto"
              mb={4}
            />
            <Text fontSize="lg" fontWeight="500">
              {character.name}
            </Text>
            <Button size="sm" marginTop={3}>
              <Icon as={FaSearch} mr={2} />
              Ver detalhes
            </Button>
          </Box>
        ))
      ) : (
        <Text>Nenhum personagem encontrado.</Text>
      )}
    </SimpleGrid>
  )
}

export default CharacterCard
