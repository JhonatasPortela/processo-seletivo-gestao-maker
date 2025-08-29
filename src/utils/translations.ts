export const translateStatus = (status: string): string => {
  const translations: { [key: string]: string } = {
    Alive: 'Vivo',
    Dead: 'Morto',
    unknown: 'Desconhecido',
  }
  return translations[status] || status
}

export const translateGender = (gender: string): string => {
  const translations: { [key: string]: string } = {
    Female: 'Feminino',
    Male: 'Masculino',
    Genderless: 'Sem Gênero',
    unknown: 'Desconhecido',
  }
  return translations[gender] || gender
}

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}
