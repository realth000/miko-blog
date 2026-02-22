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
    <aside className="sticky top-(--nav-bar-safe-area-height) w-(--side-bar-width) self-start">
      I am the article contents side bar
      <nav className="space-y-1">
        {toc.map((x) => (
          <div key={`#header-${x.title}`}>
            <a
              href={`#${x.anchorId}`}
              className="block rounded px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <div>{`${x.level.toString()} - ${x.title}`}</div>
            </a>
          </div>
        ))}
      </nav>
    </aside>
  )
}
