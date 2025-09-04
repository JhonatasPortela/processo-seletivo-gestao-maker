import {
  Flex,
  Text,
  Image,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Character } from '../typings/character'
import { useThemeColors } from '../hooks/useThemeColors'

interface CharacterItemProps {
  character: Character
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const colors = useThemeColors()

  return (
    <Flex
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg={useColorModeValue(colors.bg.light, colors.bg.dark)}
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
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
        border="2px solid"
        borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
        mx="auto"
        mb={4}
      />
      <Text fontSize="lg" fontWeight="500">
        {character.name}
      </Text>
      <Button
        as={Link}
        to={`/character/${character.id}`}
        size="sm"
        marginTop={3}
        color={useColorModeValue(colors.text.light, colors.text.dark)}
        bg={useColorModeValue(
          colors.buttonDetails.light,
          colors.buttonDetails.dark
        )}
        _hover={{ bg: 'gray.500' }}
      >
        <Icon as={FaSearch} mr={2} />
        Ver detalhes
      </Button>
    </Flex>
  )
}

export default CharacterItem
