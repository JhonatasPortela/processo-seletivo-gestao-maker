import {
  Flex,
  Image,
  Link as ChakraLink,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useThemeColors } from '../hooks/useThemeColors'

import logo from '../assets/img/portal-rick-and-morty.gif'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const colors = useThemeColors()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={useColorModeValue(colors.bg.light, colors.bg.dark)}
      color={useColorModeValue(colors.text.light, colors.text.dark)}
      borderBottom="1px solid"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      position="fixed"
      width="100%"
      top={0}
      left={0}
      zIndex={1000}
      boxShadow="md"
    >
      <Flex align="center">
        <ChakraLink as={ReactRouterLink} to="/" mr={3}>
          <Image src={logo} alt="Portal" boxSize="50px" objectFit="contain" />
        </ChakraLink>

        <ChakraLink
          as={ReactRouterLink}
          to="/"
          p={2}
          _hover={{
            textDecoration: 'none',
            color: useColorModeValue('green.600', 'green.300'),
          }}
          fontWeight="semibold"
          fontSize="lg"
          mr={4}
        >
          Home
        </ChakraLink>

        <ChakraLink
          as={ReactRouterLink}
          to="/characters"
          p={2}
          _hover={{
            textDecoration: 'none',
            color: useColorModeValue('green.600', 'green.300'),
          }}
          fontWeight="semibold"
          fontSize="lg"
        >
          Personagens
        </ChakraLink>
      </Flex>

      <IconButton
        aria-label="Alternar modo de cor"
        icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        color={useColorModeValue('gray.800', 'whiteAlpha.900')}
        _hover={{ bg: 'green.700', color: 'white' }}
        borderRadius="full"
      />
    </Flex>
  )
}

export default Navbar
