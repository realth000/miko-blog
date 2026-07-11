import { IconBrightnessAuto, IconMoon, IconSun } from '@tabler/icons-react'
import { useContext } from 'react'
import { useIsDarkTheme } from '@/hooks/use-is-dark-theme'
import { getI18n } from '@/i18n/i18n-context'
import ThemeContext from '@/providers/theme-context'
import configValue from '@/values/config-value'

function ThemeButton() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { theme, setTheme } = useContext(ThemeContext)!

  const toggleTHeme = () => {
    setTheme(theme == 'light' ? 'dark' : theme == 'dark' ? 'system' : 'light')
  }

  const tr = getI18n().navBar.theme

  return (
    <button onClick={toggleTHeme} className="hover:text-primary">
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
  const siteName = configValue.siteName
  const isDarkTheme = useIsDarkTheme()

  return (
    <header className="h-nav-bar-height border-outline-variant bg-surface-container-low/80 fixed top-0 right-0 left-0 flex gap-6 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="mr-auto ml-0 flex max-w-6xl items-center justify-between gap-6">
        <div className="shrink-0">
          <a
            href="#/"
            className="text-on-surface hover:text-primary flex items-center gap-2 text-xl font-bold"
          >
            <img
              src={isDarkTheme ? './logo-dark.svg' : './logo.svg'}
              alt="logo"
              className="h-8 w-8"
            ></img>
            {siteName}
          </a>
        </div>
      </div>
      <div>
        <ThemeButton />
      </div>
      <div className="flex gap-2">
        {[
          [tr.articles, '#/articles'],
          [tr.projects, '#/projects'],
          [tr.friends, '#/friends'],
          [tr.whisper, '#/whisper'],
          [tr.about, '#/about'],
        ].map((tab) => (
          <a
            key={tab.at(1)}
            href={tab.at(1)}
            className="hover:text-primary text-on-surface"
          >
            {tab.at(0)}
          </a>
        ))}
      </div>
    </header>
  )
}
