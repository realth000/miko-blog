import type { Translations } from './i18n'

export const i18nCht: Translations = {
  siteName: 'Site Name',
  navBar: {
    theme: {
      dark: '主題：深色',
      light: '主題：淺色',
      followSystem: '主題：跟隨系統',
    },
    articles: '文章',
    projects: '專案',
    about: '關於',
  },
  articlePage: {
    tableOfContents: {
      title: '目錄',
    },
    components: {
      codeBlock: {
        title: function (_lang: string | undefined): string {
          return '程式碼區塊'
          // return lang === undefined ? '程式碼區塊' : `程式碼區塊（${lang}）`
        },
        copyButton: {
          tooltip: '複製程式碼',
          copiedTooltip: '已複製',
        },
      },
      heading: {
        copyButton: {
          tooltip: '複製標題連結',
          copiedTooltip: '已複製',
        },
      },
    },
  },
  notFoundPage: {
    title: '頁面不存在',
    funMessage: '當前頁面在宇宙中漂泊，不知道到哪裡去了',
    message: '您想訪問的頁面不存在，請檢查 URL 是否正確。',
  },
}
