import fs from 'node:fs'
import path from 'node:path'
import { highlightCodeBlocks } from './highlighter/highlight-code-blocks.ts'
import { escapeSingleQuote } from './shared/escape-string.ts'
import { log, fatal, warn } from './shared/log.ts'
import { parseMdxTableOfContent } from './shared/parse-mdx-toc.ts'
import type { MdxContentTable } from './shared/mdx-content-table.ts'

/**
 * Allow using js in article titles.
 *
 * Because artiles are written in `mdx` format, it is possible
 * to use js in markdown titles. If so, when generating unique
 * anchor for titles, those js code are opaque during codegen,
 * causing unconsistent or duplicate anchor urls.
 *
 * When this field is set to true, the generator will try to
 * generate readable anchor links, or number hashes when set
 * to false, if you are using js in article titles.
 */

let allowJsInArticleTitles = false

for (const arg of process.argv) {
  if (arg === '--allowJsInArticleTitles') {
    allowJsInArticleTitles = true
  }
}

/**
 * Doc input info
 */
interface DocInputInfo {
  dirPath: string
  dirName: string
  docPath: string
  configPath: string
}

interface DocConfig {
  title: string
  summary: string
  date: string
  tags: string[]
  draft: boolean
}

function isDocConfig(data: unknown): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'title' in data &&
    typeof data.title === 'string' &&
    'summary' in data &&
    typeof data.summary === 'string' &&
    'date' in data &&
    typeof data.date === 'string' &&
    'tags' in data &&
    Array.isArray(data.tags) &&
    data.tags.every((ele) => typeof ele === 'string') &&
    'draft' in data &&
    typeof data.draft === 'boolean'
  )
}

log('generating documents')

const docInputDir = './src/contents'
const docOutputDir = './src/pages/generated'
const docTsxTemplageFile = './src/pages/ArticlePage.template.tsx'

if (!fs.existsSync(docInputDir)) {
  fatal(`doc input directory ${docInputDir} not exists`)
}

if (!fs.existsSync(docOutputDir)) {
  fatal(`doc output directory ${docOutputDir} not exists`)
}

if (!fs.existsSync(docTsxTemplageFile)) {
  fatal(`doc tsx template file ${docTsxTemplageFile} not exists`)
}

function walkSync(dir: string): DocInputInfo[] {
  const docList = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    // Check doc path
    const docPath = path.posix.join(dir, entry.name, 'index.mdx')
    const configPath = path.posix.join(dir, entry.name, 'config.json')
    if (!fs.existsSync(docPath) || !fs.existsSync(configPath)) {
      continue
    }

    docList.push({
      dirPath: path.posix.join(dir, entry.name),
      dirName: entry.name,
      docPath,
      configPath,
    })
  }

  return docList
}

function deleteOldFile() {
  const entries = fs.readdirSync(docOutputDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.name.startsWith('Article') || !entry.name.endsWith('Page.tsx')) {
      continue
    }

    fs.unlinkSync(path.join(docOutputDir, entry.name))
  }
}

log('delete old files')
deleteOldFile()

log('collect docs')
const docs = walkSync(docInputDir)

log('generating docs')
const templateComponentString = fs.readFileSync(docTsxTemplageFile, 'utf8')
const dynamicRoutes = []

for (const [i, doc] of docs.entries()) {
  log(`generate tsx file for ${doc.docPath}`)
  try {
    const jsonData = fs.readFileSync(doc.configPath, 'utf8')
    // We have to do that.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const config = JSON.parse(jsonData)
    if (!isDocConfig(config)) {
      fatal(`inalid document config: ${doc.configPath}`)
    }

    const id = String(i).padStart(8, '0')
    const component = `Article${id}Page`
    // Save the updated document in the generated folder.
    // The `updatedDoc` is injected with anchor ids for deep linking.
    const { toc: tableOfContents, doc: updatedDoc } = parseMdxTableOfContent(
      doc.docPath,
      allowJsInArticleTitles,
    )
    const highlightedDoc = await highlightCodeBlocks(updatedDoc)
    fs.writeFileSync(
      path.join(docOutputDir, `${component}.mdx`),
      highlightedDoc,
    )

    // const docPathTrimmed = doc.docPath.replace(/src[\\/]/, '')

    const outputComponentString =
      '/* eslint-disable import/order */\n' +
      templateComponentString
        // .replace('// @@DOC_IMPORT_PATH@@', `import Doc from '@/${docPathTrimmed}'`)
        .replace(
          '// @@DOC_IMPORT_PATH@@',
          `import Doc from './${component}.mdx'`,
        )
        .replace(
          '// @@DOC_TABLE_OF_CONTENTS@@',
          tableOfContents
            .map(
              (x) => `{
    level: ${x.level.toString()},
    title: '${escapeSingleQuote(x.title)}',
    anchorId: '${x.anchorId}',
  },`,
            )
            .join('\n  ')
            .trim(),
        )
        .replace('ArticleTemplatePage', component)
        .replace(
          /{\/\* @@DOC_CONTENT@@ \*\/}/,
          '<Doc components={MDX_COMPONENTS}/>',
        )
        .replace('// @ts-expect-error Not used in template', '') // The report here is unused after codegen, remove it.

    fs.writeFileSync(
      path.join(docOutputDir, `${component}.tsx`),
      outputComponentString,
    )

    const { title, date, tags, draft, summary } = config as DocConfig
    dynamicRoutes.push({
      importPath: `@/pages/${component}.tsx`,
      path: doc.dirName,
      title,
      component,
      doc,
      date,
      tags,
      draft,
      summary,
    })
  } catch (error) {
    fatal(`failed to generate doc for ${doc.dirPath}:`, error)
  }
}

log(
  'generate article dynamic routes:',
  dynamicRoutes.map((route) => route.path),
)
const articleTemplateRouteString = fs.readFileSync(
  './src/pages/article-dynamic-route.template.ts',
  'utf8',
)
const articleDynamicRouteFile = path.join(
  docOutputDir,
  'article-dynamic-route.ts',
)
const articleDynamicRouteString = articleTemplateRouteString
  .replace(
    '// @@DOC_PATHS@@',
    dynamicRoutes
      .map(
        (r) => `{
      path: '${r.path}',
      title: '${escapeSingleQuote(r.title)}',
      component: lazy(() => import('@/pages/generated/${r.component}.tsx')),
    },`,
      )
      .join('\n    ')
      .trim(),
  )
  .replace('// @ts-expect-error Not used in template', '') // The report not works anymore after codegen, remove it.

fs.writeFileSync(articleDynamicRouteFile, articleDynamicRouteString)

log('generate articles page')
const articlesTemplateString = fs.readFileSync(
  './src/pages/ArticlesPage.template.tsx',
  'utf8',
)
const articlesFile = path.join(docOutputDir, 'ArticlesPage.tsx')
const articlesPageString = articlesTemplateString.replace(
  '// @@ARTICLE_INFO@@',
  dynamicRoutes
    .map(
      (r) => `{
    title: '${escapeSingleQuote(r.title)}',
    route: '${r.path}',
    date: new Date('${r.date}'),
    summary: '${r.summary}',
    tags: [${r.tags.map((tag) => `'${tag}'`).join(', ')}],
    draft: ${r.draft ? 'true' : 'false'},
  },`,
    )
    .join('\n  ')
    .trim(),
)

fs.writeFileSync(articlesFile, articlesPageString)

log('generating about page')

const aboutMeDocFile = './src/values/about.mdx'
const aboutMeExampleDocFile = './src/values/about.example.mdx'

let aboutMeContent: { toc: MdxContentTable; doc: string }

if (fs.existsSync(aboutMeDocFile)) {
  aboutMeContent = parseMdxTableOfContent(
    aboutMeDocFile,
    allowJsInArticleTitles,
  )
} else if (fs.existsSync(aboutMeExampleDocFile)) {
  aboutMeContent = parseMdxTableOfContent(
    aboutMeExampleDocFile,
    allowJsInArticleTitles,
  )
  warn(
    `about me doc not exists at ${aboutMeDocFile}, using the example document`,
  )
} else {
  fatal(
    `no available about me doc found. Write your own doc at ${aboutMeDocFile} and run this command again`,
  )
  throw new Error('unreachable; To make the compiler happy.')
}

aboutMeContent.doc = await highlightCodeBlocks(aboutMeContent.doc)

fs.writeFileSync(path.join(docOutputDir, 'about.mdx'), aboutMeContent.doc)

const aboutMeTemplateString = fs.readFileSync(
  './src/pages/AboutPage.template.tsx',
  'utf8',
)
const aboutMePageString = aboutMeTemplateString
  .replace('// @ts-expect-error Not used in template', '') // The report not works anymore after codegen, remove it.
  .replace('// @@DOC_IMPORT_PATH@@', "import Doc from './about.mdx'")
  .replace(/{\/\* @@DOC_CONTENT@@ \*\/}/, '<Doc components={MDX_COMPONENTS}/>')

fs.writeFileSync(path.join(docOutputDir, `AboutPage.tsx`), aboutMePageString)

log('generated about page')
