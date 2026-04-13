import useMainBodyItem from '@/hooks/use-main-body-item'
import { getI18n } from '@/i18n/i18n-context'
import type { ArticleTableOfContents } from '@/models/article-table-of-contents'

export default function ArticleContents({
  toc,
}: {
  toc: ArticleTableOfContents
}) {
  const titleIds = toc.map((toc) => toc.anchorId)

  const bodyItemId = useMainBodyItem(titleIds)

  const tr = getI18n().articlePage.tableOfContents

  return (
    <aside className="top-nav-bar-safe-area-height w-side-bar-width sticky self-start">
      <div className="pb-2 text-xl">{tr.title}</div>
      <nav className="flex flex-col gap-1">
        {toc.map((x) => (
          <div key={`#header-${x.title}`}>
            <a
              href={`#${x.anchorId}`}
              className="text-on-surface-variant hover:bg-surface-container-high group block rounded-sm px-3 py-1 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`bg-primary/30 group-hover:bg-primary group-hover:border-primary h-px group-hover:border ${
                    x.anchorId === bodyItemId
                      ? 'bg-primary border-primary border'
                      : ''
                  }`}
                  style={{
                    width: `${((x.level - 1) * 0.5 + 0.5).toString()}rem`,
                  }}
                ></span>
                <span
                  className={`group-hover:text-primary text-on-surface/80 truncate ${
                    x.anchorId === bodyItemId ? 'text-primary' : ''
                  }`}
                >
                  {x.title}
                </span>
              </div>
            </a>
          </div>
        ))}
      </nav>
    </aside>
  )
}
