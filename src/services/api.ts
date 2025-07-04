import axios from 'axios'
import { ApiResponse, Character } from '../typings/character'

const API_URL = 'https://rickandmortyapi.com/api'

export const getCharacters = async (
  page: number = 1,
  nameSearch: string = ''
): Promise<ApiResponse> => {
  try {
    const config = {
      params: {
        page: page,
        name: nameSearch,
      },
    }
    const response = await axios.get<ApiResponse>(
      `${API_URL}/character`,
      config
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.warn('Nenhum personagem encontrado para a busca:', nameSearch)
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        } as ApiResponse
      }
    }
    console.error('Erro ao buscar personagens:', error)
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
