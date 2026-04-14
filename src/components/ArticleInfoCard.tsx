import { IconClock, IconTag } from '@tabler/icons-react'
import type { ArticleInfo } from '@/models/article-info'

function _ArtigleTagChip({
  tag,
  ...props
}: {
  tag: string
  [key: string]: unknown
}) {
  return (
    <div className="text-tertiary text-sm underline" {...props}>
      {tag}
    </div>
  )
}

export default function ArticleInfoCard({
  info,
  ...props
}: {
  info: ArticleInfo
  [key: string]: unknown
}) {
  return (
    <div
      key={info.route}
      className="group bg-surface-container-low hover:bg-surface-container-high rounded-xl p-4"
      {...props}
    >
      <a href={`#/articles/${info.route}`}>
        <h3 className="text-on-surface group-hover:text-primary mb-2 text-2xl font-bold">
          {info.title}
        </h3>
        <div className="text-on-surface-variant mb-2 text-base">
          {info.summary}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-secondary mr-2 flex items-center gap-2">
            <IconClock size={16} />
            {info.date.toISOString().replace(/T.*$/, '')}
          </div>
          <IconTag className="text-tertiary text-sm" size={16} />
          {info.tags.map((tag) => (
            <_ArtigleTagChip tag={tag} key={tag} />
          ))}
        </div>
      </a>
    </div>
  )
}
