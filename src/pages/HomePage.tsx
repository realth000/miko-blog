import Scaffold from '@/components/Scaffold'
import { getI18n } from '@/i18n/i18n-context'
import configValue from '@/values/config-value'

export default function HomePage() {
  const tr = getI18n().homePage

  return (
    <Scaffold>
      <div className="my-32 flex h-full w-full flex-col items-center justify-center gap-12">
        <h1 className="text-primary text-shadow-primary/40 text-4xl font-black tracking-tighter antialiased text-shadow-lg md:text-6xl">
          {configValue.siteName}
        </h1>
        <h2 className="text-secondary/80 my-3 max-w-prose text-lg leading-relaxed font-medium tracking-wide md:text-xl">
          {configValue.slogan}
        </h2>
        <div className="flex gap-4">
          <a
            href="#/articles"
            className="text-on-surface bg-surface-container-high hover:text-on-secondary-container hover:bg-secondary-container m-4 rounded-xl p-4 text-lg"
          >
            {tr.articles}
          </a>
          <a
            href="#/projects"
            className="text-on-surface bg-surface-container-high hover:text-on-secondary-container hover:bg-secondary-container m-4 rounded-xl p-4 text-lg"
          >
            {tr.projects}
          </a>
        </div>
      </div>
    </Scaffold>
  )
}
