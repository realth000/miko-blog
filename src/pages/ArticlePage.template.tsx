import Article from '@/components/Article.tsx'
import ArticleContents from '@/components/ArticleContents.tsx'
// @ts-expect-error Not used in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mdxComponents } from '@/components/MdxComponents.tsx'
import Scaffold from '@/components/Scaffold.tsx'
import type { ArticleTableOfContents } from '@/models/article-table-of-contents.tsx'
// @@DOC_IMPORT_PATH@@

const toc: ArticleTableOfContents = [
  // @@DOC_TABLE_OF_CONTENTS@@
]

export default function ArticleTemplatePage() {
  return (
    <Scaffold>
      <Article>
        {/* @@DOC_CONTENT@@ */}
      </Article>
      <ArticleContents toc={toc}/>
    </Scaffold>
  )
}
