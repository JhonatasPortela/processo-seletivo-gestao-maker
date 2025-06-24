import { Flex } from '@chakra-ui/react'

const Background = ({ children }) => {
  return (
    <Flex
      bgImage="src/assets/img/HuGGeENt6kGyixe3hT9tnY-650-80.jpg.webp"
      bgSize="auto"
      bgPosition="center"
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      bgAttachment="fixed"
    >
      {children}
    </Flex>
  )
}
export default Background
