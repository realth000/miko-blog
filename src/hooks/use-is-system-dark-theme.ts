import { useEffect, useState } from 'react'

function isMediaQueryPrefersDark(): boolean {
  return globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Check if the system theme prefers dark or not.
 *
 * Note that this hook does not reguards the theme settings in app, only
 * queries system level theme.
 *
 * To get the result combines both app settings and system preference,
 * use `useIsDarkTheme`.
 *
 * @returns If the system prefers dark theme.
 */
export function useIsSystemDarkTheme(): boolean {
  const [isSystemDarkTheme, setIsSystemDarkTheme] = useState(() =>
    isMediaQueryPrefersDark(),
  )

  useEffect(() => {
    const themeMediaQuery = globalThis.window.matchMedia(
      '(prefers-color-scheme: dark)',
    )

    const onThemeMediaChanged = (e: MediaQueryListEvent) => {
      setIsSystemDarkTheme(e.matches)
    }

    themeMediaQuery.addEventListener('change', onThemeMediaChanged)

    return () => {
      themeMediaQuery.removeEventListener('change', onThemeMediaChanged)
    }
  }, [])

  return isSystemDarkTheme
}
