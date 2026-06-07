import { IconArrowBarToUp } from '@tabler/icons-react'
import Article from '@/components/Article'
import ArticleContents from '@/components/ArticleContents'
import Scaffold from '@/components/Scaffold'
// @ts-expect-error Not used in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MDX_COMPONENTS } from '@/components/mdx/MdxComponents'
import usePageOffset from '@/hooks/use-page-offset'
import type { ArticleTableOfContents } from '@/models/article-table-of-contents'
// @@DOC_IMPORT_PATH@@

const toc: ArticleTableOfContents = [
  // @@DOC_TABLE_OF_CONTENTS@@
]

export default function ArticleTemplatePage() {
  const offset = usePageOffset()

  return (
    <Scaffold className="relative">
      <Article>{/* @@DOC_CONTENT@@ */}</Article>
      {toc.length > 0 && <ArticleContents toc={toc} />}
      <button
        className={`bg-secondary-container fixed right-12 bottom-12 flex h-13 w-13 cursor-pointer items-center justify-center rounded-xl transition duration-300 ${offset >= 5 ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => {
          globalThis.scrollTo(0, 0)
        }}
      >
        <IconArrowBarToUp size={28} className="text-on-secondary-container" />
      </button>
    </Scaffold>
  )
}
