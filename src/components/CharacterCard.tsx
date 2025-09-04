import { SimpleGrid } from '@chakra-ui/react'
import { Character } from '../typings/character'
import CharacterItem from './CharacterItem'

interface CharacterCardProps {
  characters: Character[]
}

const CharacterCard = ({ characters }: CharacterCardProps) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </SimpleGrid>
  )
}

export default CharacterCard
