import axios from 'axios'
import { ApiResponse, Character } from '../typings/character'

const API_URL = 'https://rickandmortyapi.com/api'

export const getAllCharacters = async (): Promise<Character[]> => {
  let allCharacters: Character[] = []
  let nextUrl: string | null = `${API_URL}/character`

  try {
    while (nextUrl) {
      const response = await axios.get<ApiResponse>(nextUrl)
      allCharacters = allCharacters.concat(response.data.results)
      nextUrl = response.data.info.next
    }
    return allCharacters
  } catch (error) {
    console.error('Erro ao buscar todos os personagens:', error)
    throw error
  }
}

export const getCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get<Character>(`${API_URL}/character/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar personagem com ID ${id}:`, error)
    throw error
  }
}
