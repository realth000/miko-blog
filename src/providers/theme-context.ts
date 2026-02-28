import { createContext } from 'react'

/**
 * Color scheme.
 */
export type ColorScheme = 'light' | 'dark' | 'system'

const ThemeContext = createContext<
  | {
      theme: ColorScheme
      setTheme: React.Dispatch<React.SetStateAction<ColorScheme>>
    }
  | undefined
>(undefined)

export default ThemeContext
