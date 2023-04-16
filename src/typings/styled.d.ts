import 'styled-components'

interface Shades {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSizes: Array<string>
    font: string
    colors: {
      background: string
      dark: string
      primary: string
      white: string
      success: string
      warning: string
      danger: string
    }
    shades: {
      primary: Shades
      dark: Shades
      danger: Record<100 | 200 | 300 | 500 | 700, string>
      background: Record<700, string>
    }
  }
}
