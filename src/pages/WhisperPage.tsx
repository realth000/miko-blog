import Article from '@/components/Article'
import { ColumnLayout } from '@/components/ColumnLayout'
import Scaffold from '@/components/Scaffold'
import { MDX_COMPONENTS } from '@/components/mdx/MdxComponents'
import { getI18n } from '@/i18n/i18n-context'
import Doc from '@/values/whispers.mdx'

export default function WhisperPage() {
  const tr = getI18n().whisperPage

  return (
    <Scaffold>
      <ColumnLayout className="gap-y-4">
        <h1 className="my-2 text-2xl font-bold md:text-4xl">{tr.title}</h1>
        <Article>
          <Doc components={MDX_COMPONENTS} />
        </Article>
      </ColumnLayout>
    </Scaffold>
  )
}
