import ArticleInfoCard from '@/components/ArticleInfoCard'
import { ColumnLayout } from '@/components/ColumnLayout'
import Scaffold from '@/components/Scaffold'
import { getI18n } from '@/i18n/i18n-context'
import type { ArticleInfo } from '@/models/article-info'

const articleInfo: ArticleInfo[] = [
  // @@ARTICLE_INFO@@
]

export default function ArticlesPage() {
  const tr = getI18n().articlesPage

  return (
    <Scaffold>
      <ColumnLayout className="gap-y-4">
        <h1 className="my-2 text-2xl font-bold md:text-4xl">{tr.title}</h1>
        {articleInfo
          .toSorted((a, b) => (a.date === b.date ? 0 : a.date > b.date ? 0 : 1))
          .map((info) => (
            <ArticleInfoCard key={info.route} info={info} />
          ))}
      </ColumnLayout>
    </Scaffold>
  )
}
