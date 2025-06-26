import { Flex } from '@chakra-ui/react'
import imgBackground from '../assets/img/HuGGeENt6kGyixe3hT9tnY-650-80.jpg.webp'

const Background = ({ children }) => {
  return (
    <Flex
      bgImage={imgBackground}
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
