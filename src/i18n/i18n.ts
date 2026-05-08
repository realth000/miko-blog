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
    friends: string
    whisper: string
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
  articlesPage: {
    title: string
  }
  projectsPage: {
    title: string
  }
  friendsPage: {
    title: string
    details: string
    invite: string
  }
  whisperPage: {
    title: string
    details: string
  }
}
