import { Box } from '@chakra-ui/react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Box minH="100vh">
      <Navbar />
      <AppRoutes />
      <Footer />
    </Box>
  )
}

export default App
