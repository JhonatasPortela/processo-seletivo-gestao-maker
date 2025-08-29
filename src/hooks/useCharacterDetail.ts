import { useEffect, useState } from 'react'
import { getCharacterById, getEpisodeById } from '../services/api'
import { Character, Episode } from '../typings/character'
import { useParams } from 'react-router-dom'

interface useCharacterDetailReturn {
  character: Character | null
  loading: boolean
  error: string | null
  episodes: Episode[]
  loadingEpisodes: boolean
  episodesError: string | null
}

export const useCharacterDetail = (): useCharacterDetailReturn => {
  const { id } = useParams<{ id: string }>()
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

  return {
    character,
    loading,
    error,
    episodes,
    loadingEpisodes,
    episodesError,
  }
}
