import type { Translations } from './i18n'

export const i18nEn: Translations = {
  siteName: 'SiteName',
  navBar: {
    theme: {
      dark: 'Dark',
      light: 'Light',
      followSystem: 'Follow system',
    },
    articles: 'Articles',
    projects: 'Projects',
    about: 'About',
  },
  acticlePage: {
    tableOfContents: {
      title: 'Table of Contents',
    },
    components: {
      codeBlock: {
        copyButton: {
          title: function (_lang: string | undefined): string {
            return 'CodeBlock'
            // return lang === undefined ? 'CodeBlock' : `CodeBlock (${lang})`
          },
          tooltip: 'Copy code',
          copiedTooltip: 'Copied',
        },
      },
    },
  },
}
