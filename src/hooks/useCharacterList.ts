import { useState, useEffect, useCallback, useRef, RefObject } from 'react'
import { getCharacters } from '../services/api'
import { Character } from '../typings/character'

interface UseCharactersListReturn {
  characters: Character[]
  isLoadingInitial: boolean
  isLoadingMore: boolean
  error: string | null
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  currentSearchTerm: string
  hasMore: boolean
  observerTarget: RefObject<HTMLDivElement | null>
  handleSearchClick: () => void
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
  handleClearInput: () => void
}

export const useCharactersList = (): UseCharactersListReturn => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSearchTerm, setCurrentSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef(null)
  const observer = useRef<IntersectionObserver | null>(null)

  // -------------------------Functions------------------------------------
  const fetchCharacters = useCallback(async (page: number, term: string) => {
    if (page === 1) {
      setIsLoadingInitial(true)
    } else {
      setIsLoadingMore(true)
    }
    setError(null)

    try {
      const data = await getCharacters(page, term)
      setCharacters((prevCharacters) =>
        page === 1 ? data.results : [...prevCharacters, ...data.results]
      )
      setHasMore(data.info.next !== null)
    } catch (erro) {
      console.error('Falha ao buscar personagens:', erro)
      setError(
        'Erro ao carregar personagens. Verifique sua conexão ou tente novamente mais tarde.'
      )
      setHasMore(false)
      setCharacters([])
    } finally {
      setIsLoadingInitial(false)
      setIsLoadingMore(false)
    }
  }, [])

  // -------------------------Effects------------------------------------
  useEffect(() => {
    setCurrentPage(1)
    setCharacters([])
    setHasMore(true)
    setError(null)
    fetchCharacters(1, currentSearchTerm)
  }, [currentSearchTerm, fetchCharacters])

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        const target =
          entries && entries.length > 0
            ? entries.find((entry) => entry.isIntersecting)
            : null

        if (
          target &&
          !isLoadingInitial &&
          !isLoadingMore &&
          hasMore &&
          characters.length > 0
        ) {
          setCurrentPage((prevPage) => prevPage + 1)
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      }
    )

    if (observerTarget.current) {
      observer.current.observe(observerTarget.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [isLoadingInitial, isLoadingMore, hasMore, characters.length])

  useEffect(() => {
    if (currentPage > 1) {
      fetchCharacters(currentPage, currentSearchTerm)
    }
  }, [currentPage, currentSearchTerm, fetchCharacters])

  // -------------------------Handlers------------------------------------
  const handleSearchClick = useCallback(() => {
    setCurrentSearchTerm(searchTerm)
  }, [searchTerm])

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearchClick()
      }
    },
    [handleSearchClick]
  )

  const handleClearInput = useCallback(() => {
    setSearchTerm('')
    setCurrentSearchTerm('')
  }, [])

  // -------------------------------------------------------------
  return {
    characters,
    isLoadingInitial,
    isLoadingMore,
    error,
    searchTerm,
    setSearchTerm,
    currentSearchTerm,
    hasMore,
    observerTarget,
    handleSearchClick,
    handleKeyPress,
    handleClearInput,
  }
}
