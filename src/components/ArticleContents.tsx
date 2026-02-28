import type { ArticleTableOfContents } from '@/models/article-table-of-contents'

export default function ArticleContents({
  toc,
}: {
  toc: ArticleTableOfContents
}) {
  if (toc.length === 0) {
    return <></>
  }

  return (
    <aside className="top-nav-bar-safe-area-height w-side-bar-width sticky self-start">
      I am the article contents side bar
      {/* <nav className="space-y-1"> */}
      <nav className="flex flex-col gap-0.5">
        {toc.map((x) => (
          <div key={`#header-${x.title}`}>
            <a
              href={`#${x.anchorId}`}
              className="text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface group block rounded-lg px-3 py-2 text-sm transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`bg-primary/30 group-hover:bg-primary group-hover:border-primary h-px transition-all group-hover:border`}
                  style={{
                    width: `${((x.level - 1) * 0.5 + 0.25).toString()}rem`,
                  }}
                ></span>
                <span className="group-hover:text-primary text-on-surface/80 truncate transition-colors duration-200">
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
