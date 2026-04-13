import { IconBrightnessAuto, IconMoon, IconSun } from '@tabler/icons-react'
import { useContext } from 'react'
import { getI18n } from '@/i18n/i18n-context'
import ThemeContext from '@/providers/theme-context'

function ThemeButton() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { theme, setTheme } = useContext(ThemeContext)!

  const toggleTHeme = () => {
    setTheme(theme == 'light' ? 'dark' : theme == 'dark' ? 'system' : 'light')
  }

  const tr = getI18n().navBar.theme

  return (
    <button onClick={toggleTHeme}>
      {theme == 'light' ? (
        <IconSun title={tr.light} />
      ) : theme == 'dark' ? (
        <IconMoon title={tr.dark} />
      ) : (
        <IconBrightnessAuto title={tr.followSystem} />
      )}
    </button>
  )
}

export default function NavBar() {
  const tr = getI18n().navBar

  return (
    <header className="h-nav-bar-height border-outline-variant bg-surface-container-low/80 fixed top-0 right-0 left-0 flex gap-6 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="mr-auto ml-0 flex max-w-6xl items-center justify-between gap-6">
        <div className="shrink-0">
          <a href="/">{getI18n().siteName}</a>
        </div>
      </div>
      <div>
        <ThemeButton />
      </div>
      <div className="flex gap-2">
        <a href="#/articles">{tr.articles}</a>
        <a href="#/projects">{tr.projects}</a>
        <a href="#/about">{tr.about}</a>
      </div>
    </header>
  )
}
