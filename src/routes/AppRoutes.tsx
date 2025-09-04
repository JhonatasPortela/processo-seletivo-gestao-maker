import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CharacterList from '../pages/CharacterList'
import CharacterDetail from '../pages/CharacterDetail'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/characters" element={<CharacterList />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes
