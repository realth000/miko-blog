import type { ArticleTableOfContents } from '@/models/article-table-of-contents'

export default function ArticleContents({ toc }: { toc: ArticleTableOfContents }) {
  if (toc.length === 0) {
    return <></>
  }

  return (
    <aside className='miko-side-bar'>
      I am the article contents side bar
      <div>
        {toc.map(x => (
          <div key={`#header-${x.title}`}>
            <a href={`#${x.anchorId}`}>
              <div>{`${x.level.toString()} - ${x.title}`}</div>
            </a>
          </div>
        ))}
      </div>
    </aside>
  )
}
