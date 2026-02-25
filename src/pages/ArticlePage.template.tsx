import Article from '@/components/Article'
import ArticleContents from '@/components/ArticleContents'
import Scaffold from '@/components/Scaffold'
// @ts-expect-error Not used in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MDX_COMPONENTS } from '@/components/mdx/MdxComponents'
import type { ArticleTableOfContents } from '@/models/article-table-of-contents'
// @@DOC_IMPORT_PATH@@

const toc: ArticleTableOfContents = [
  // @@DOC_TABLE_OF_CONTENTS@@
]

export default function ArticleTemplatePage() {
  return (
    <Scaffold>
      <Article>{/* @@DOC_CONTENT@@ */}</Article>
      <ArticleContents toc={toc} />
    </Scaffold>
  )
}
