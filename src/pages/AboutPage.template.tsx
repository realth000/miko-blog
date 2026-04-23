import Article from '@/components/Article'
import Scaffold from '@/components/Scaffold'
// @ts-expect-error Not used in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MDX_COMPONENTS } from '@/components/mdx/MdxComponents'
// @@DOC_IMPORT_PATH@@

export default function AboutPage() {
  return (
    <Scaffold>
      <Article>{/* @@DOC_CONTENT@@ */}</Article>
    </Scaffold>
  )
}
