import type { Translations } from './i18n'

export const i18nEn: Translations = {
  siteName: 'SiteName',
  navBar: {
    theme: {
      dark: 'Theme: Dark',
      light: 'Theme: Light',
      followSystem: 'Theme: Follow system',
    },
    articles: 'Articles',
    projects: 'Projects',
    about: 'About',
  },
  homePage: {
    articles: 'Read articles',
    projects: 'See projects',
  },
  articlePage: {
    tableOfContents: {
      title: 'Table of Contents',
    },
    components: {
      codeBlock: {
        title: function (_lang: string | undefined): string {
          return 'CodeBlock'
          // return lang === undefined ? 'CodeBlock' : `CodeBlock (${lang})`
        },
        copyButton: {
          tooltip: 'Copy code',
          copiedTooltip: 'Copied',
        },
      },
      heading: {
        copyButton: {
          tooltip: 'Copy chapter direct linke',
          copiedTooltip: 'Copied',
        },
      },
    },
  },
  notFoundPage: {
    title: 'Page not found',
    funMessage: 'The page is lost in the universe, no one knowns where it is',
    message: 'The page you visiting does not exist, please check the url',
  },
  articlesPage: {
    title: 'Articles',
  },
  projectsPage: {
    title: 'Projects',
  },
}
