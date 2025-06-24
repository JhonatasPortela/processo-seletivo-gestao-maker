import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CharacterList from '../pages/CharacterList'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
