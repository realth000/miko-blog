import type { Translations } from './i18n'

export const i18nZh: Translations = {
  siteName: 'Site Name',
  navBar: {
    theme: {
      dark: '深色',
      light: '浅色',
      followSystem: '跟随系统',
    },
    articles: '文章',
    projects: '项目',
    about: '关于',
  },
  acticlePage: {
    tableOfContents: {
      title: '目录',
    },
    components: {
      codeBlock: {
        copyButton: {
          title: function (_lang: string | undefined): string {
            return '代码块'
            // return lang === undefined ? '代码块' : `代码块（${lang}）`
          },
          tooltip: '复制代码',
          copiedTooltip: '已复制',
        },
      },
      heading: {
        copyButton: {
          tooltip: '复制章节跳转链接',
          copiedTooltip: '已复制',
        },
      },
    },
  },
}
