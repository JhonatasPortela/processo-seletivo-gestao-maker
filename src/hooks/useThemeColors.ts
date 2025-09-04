import { useToken } from '@chakra-ui/react'

export const useThemeColors = () => {
  const [bgLight, bgDark] = useToken('colors', ['bg.default', 'bg._dark'])
  const [borderLight, borderDark] = useToken('colors', [
    'border.default',
    'border._dark',
  ])
  const [textLight, textDark] = useToken('colors', [
    'text.default',
    'text._dark',
  ])
  const [buttonDetailsLight, buttonDetailsDark] = useToken('colors', [
    'buttonDetails.default',
    'buttonDetails._dark',
  ])

  const [greenLight, greenDark] = useToken('colors', [
    'greener.default',
    'greener._dark',
  ])

  return {
    bg: { light: bgLight, dark: bgDark },
    border: { light: borderLight, dark: borderDark },
    text: { light: textLight, dark: textDark },
    buttonDetails: { light: buttonDetailsLight, dark: buttonDetailsDark },
    greener: { light: greenLight, dark: greenDark },
  }
}
