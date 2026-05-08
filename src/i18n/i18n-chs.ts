import type { Translations } from './i18n'

export const i18nChs: Translations = {
  siteName: 'Site Name',
  navBar: {
    theme: {
      dark: '主题：深色',
      light: '主题：浅色',
      followSystem: '主题：跟随系统',
    },
    articles: '文章',
    projects: '项目',
    friends: '朋友',
    whisper: '细语',
    about: '关于',
  },
  homePage: {
    articles: '阅读文章',
    projects: '查看项目',
  },
  articlePage: {
    tableOfContents: {
      title: '目录',
    },
    components: {
      codeBlock: {
        title: function (_lang: string | undefined): string {
          return '代码块'
          // return lang === undefined ? '代码块' : `代码块（${lang}）`
        },
        copyButton: {
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
  notFoundPage: {
    title: '页面不存在',
    funMessage: '当前页面在宇宙中漂泊，不知道到哪里去了',
    message: '您想访问的页面不存在，请检查url是否正确。',
  },
  articlesPage: {
    title: '文章',
  },
  projectsPage: {
    title: '项目',
  },
  friendsPage: {
    title: '朋友',
    details: '赛博朋友们',
    invite: '添加友链请点击此处联系',
  },
  whisperPage: {
    title: '细语',
    details: '闲言碎语，只当朝花夕拾',
  },
}
