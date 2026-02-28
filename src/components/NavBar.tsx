import { IconCloudQuestion, IconMoon, IconSun } from '@tabler/icons-react'
import { useContext } from 'react'
import ThemeContext from '@/providers/theme-context'

function ThemeButton() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { theme, setTheme } = useContext(ThemeContext)!

  const toggleTHeme = () => {
    setTheme(theme == 'light' ? 'dark' : theme == 'dark' ? 'system' : 'light')
  }

  return (
    <button onClick={toggleTHeme}>
      {theme == 'light' ? (
        <IconSun />
      ) : theme == 'dark' ? (
        <IconMoon />
      ) : (
        <IconCloudQuestion />
      )}
    </button>
  )
}

export default function NavBar() {
  return (
    <header className="h-nav-bar-height border-outline-variant bg-surface-container-low/80 fixed top-0 right-0 left-0 flex gap-6 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="mr-auto ml-0 flex max-w-6xl items-center justify-between gap-6">
        <div className="shrink-0">
          <a href="/">NavBar Title Link</a>
        </div>
      </div>
      <div>
        <ThemeButton />
      </div>
      <div className="flex gap-2">
        <a href="#/articles">Articles</a>
        <a href="#/projects">Projects</a>
        <a href="#/about">About</a>
      </div>
    </header>
  )
}
