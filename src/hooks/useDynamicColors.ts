import { useColorModeValue } from '@chakra-ui/react'
import { useThemeColors } from './useThemeColors'

export const useDynamicColors = () => {
  const colors = useThemeColors()

  return {
    bg: useColorModeValue(colors.bg.light, colors.bg.dark),
    border: useColorModeValue(colors.border.light, colors.border.dark),
    text: useColorModeValue(colors.text.light, colors.text.dark),
    boxBg: useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(0, 0, 0, 0.7)'),
    green: useColorModeValue(colors.greener.light, colors.greener.dark),
  }
}
