import ArticleInfoCard from '@/components/ArticleInfoCard'
import { ColumnLayout } from '@/components/ColumnLayout'
import Scaffold from '@/components/Scaffold'
import type { ArticleInfo } from '@/models/article-info'

const articleInfo: ArticleInfo[] = [
  // @@ARTICLE_INFO@@
]

export default function ArticlesPage() {
  return (
    <Scaffold>
      <ColumnLayout className="gap-y-4">
        {articleInfo
          .toSorted((a, b) => (a.date === b.date ? 0 : a.date > b.date ? 0 : 1))
          .map((info) => (
            <ArticleInfoCard key={info.route} info={info} />
          ))}
      </ColumnLayout>
    </Scaffold>
  )
}
