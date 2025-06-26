import { Flex, Image, Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import logo from '../assets/img/portal-rick-and-morty.gif'

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="start"
      wrap="wrap"
      padding={4}
      bg="gray.900"
      color="white"
      borderBottom="1px solid"
      borderColor="green.500"
      position="fixed"
      width="100%"
      top={0}
      left={0}
      zIndex={1000}
      boxShadow="md"
    >
      <ChakraLink as={ReactRouterLink} to="/" mr={3}>
        <Image src={logo} alt="Portal" boxSize="50px" objectFit="contain" />
      </ChakraLink>

      <ChakraLink
        as={ReactRouterLink}
        to="/"
        p={2}
        _hover={{ textDecoration: 'none', color: 'green.300' }}
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
        _hover={{ textDecoration: 'none', color: 'green.300' }}
        fontWeight="semibold"
        fontSize="lg"
      >
        Personagens
      </ChakraLink>
    </Flex>
  )
}

export default Navbar
