export interface Translations {
  siteName: string
  navBar: {
    theme: {
      dark: string
      light: string
      followSystem: string
    }
    articles: string
    projects: string
    about: string
  }
  homePage: {
    articles: string
    projects: string
  }
  articlePage: {
    tableOfContents: {
      title: string
    }
    components: {
      codeBlock: {
        title: (lang: string | undefined) => string
        copyButton: {
          tooltip: string
          copiedTooltip: string
        }
      }
      heading: {
        copyButton: {
          tooltip: string
          copiedTooltip: string
        }
      }
    }
  }
  notFoundPage: {
    title: string
    funMessage: string
    message: string
  }
}
