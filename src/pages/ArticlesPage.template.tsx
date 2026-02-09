import Scaffold from '@/components/Scaffold.tsx'

interface ArticleInfo {
  title: string;
  route: string;
  date: string,
  summary: string;
  tags: string[];
  draft: boolean;
}

const articleInfo : ArticleInfo[] =  [
  // @@ARTICLE_INFO@@
]

export default function ArticlesPage() {
  return (
    <Scaffold>
      {articleInfo.map((info) => (
        <div key={info.route}>
          <a style={{ padding: '8px', border: '1px red solid', }} href= {`/articles/${info.route}`}>
            <h3>{info.title}</h3>
            <div>{info.date}</div>
            <div>{info.summary}</div>
            <div>{info.tags.join('; ')}</div>
            <div>{info.draft}</div>
          </a>
        </div>
      ))}
    </Scaffold>
  )
}

