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
  acticlePage: {
    tableOfContents: {
      title: string
    }
    components: {
      codeBlock: {
        copyButton: {
          title: (lang: string | undefined) => string
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
}
