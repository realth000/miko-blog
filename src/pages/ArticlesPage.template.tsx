import { ColumnLayout } from '@/components/ColumnLayout'
import Scaffold from '@/components/Scaffold'

interface ArticleInfo {
  title: string
  route: string
  date: Date
  summary: string
  tags: string[]
  draft: boolean
}

function ArticleInfoCard(info: ArticleInfo) {
  return (
    <div
      key={info.route}
      className="rounded-xl border border-gray-200 bg-gray-700 shadow-lg"
    >
      <a href={`#/articles/${info.route}`}>
        <h3 className="mb-2 text-xl font-bold text-gray-300">{info.title}</h3>
        <div className="text-sm">{info.date.toString()}</div>
        <div>{info.summary}</div>
        <div>{info.tags.join('; ')}</div>
        <div>{info.draft}</div>
      </a>
    </div>
  )
}

const articleInfo: ArticleInfo[] = [
  // @@ARTICLE_INFO@@
]

export default function ArticlesPage() {
  return (
    <Scaffold>
      <ColumnLayout className="gap-y-4">
        {articleInfo
          .toSorted((a, b) => (a.date === b.date ? 0 : a.date > b.date ? 0 : 1))
          .map((info) => ArticleInfoCard(info))}
      </ColumnLayout>
    </Scaffold>
  )
}
