import ArticleContents from '@/components/ArticleContents.tsx'
import Scaffold from '@/components/Scaffold.tsx'
import type { ArticleTableOfContents } from '@/models/article-table-of-contents.tsx'
// @@DOC_IMPORT_PATH@@

const toc: ArticleTableOfContents = [
  // @@DOC_TABLE_OF_CONTENTS@@
]

export default function ArticleTemplatePage() {
  return (
    <Scaffold>
      <div>
        {/* @@DOC_CONTENT@@ */}
      </div>
      {toc.length > 1 && <ArticleContents toc={toc}/>}
    </Scaffold>
  )
}
