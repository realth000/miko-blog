import { useContext } from 'react'
import ThemeContext from '@/providers/theme-context'
import { useIsSystemDarkTheme } from './use-is-system-dark-theme'

/**
 * Checks should the app use dark theme or not.
 *
 * This check both system level theme config and app theme settings.
 *
 * To get system level theme preference regardless app theme settings,
 * use `useIsSystemDarkTheme`.
 *
 * @returns Should be in dark theme or not.
 */
export function useIsDarkTheme(): boolean {
  // Only use `ThemeContext` where it is available.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { theme } = useContext(ThemeContext)!
  const isSystemDarkTheme = useIsSystemDarkTheme()

  switch (theme) {
    case 'dark': {
      return true
    }
    case 'light': {
      return false
    }
    case 'system': {
      return isSystemDarkTheme
    }
  }
}
