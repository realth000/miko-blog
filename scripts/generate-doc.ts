import fs from 'node:fs'
import path from 'node:path'
import { exit } from 'node:process'

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
  title: string,
  date: string,
  tags: string[],
  draft: boolean,
}

function isDocConfig(data: unknown): boolean {
  return typeof data === 'object' && data !== null &&
  'title' in data && typeof data.title === 'string' && 
  'date' in data && typeof data.date === 'string' &&
  'tags' in data && Array.isArray(data.tags)  && data.tags.every((ele) => typeof ele === 'string') && 
  'draft' in data && typeof data.draft  === 'boolean'
}

function log(...message: unknown[]) {
  console.log('[miko-blog]', ...message)
}

function fatal(...message: unknown[]) {
  console.log('[miko-blog] [fatal]', ...message)
  exit(1)
}

log('generating documents')

const docInputDir = './src/contents'
const docOutputDir = './src/pages/generated'
const docTsxTemplageFile = './src/pages/ArticlePage.template.tsx'

if (!fs.existsSync(docInputDir)) {
  fatal(`doc input directory ${docInputDir} not exists`)
}

if (!fs.existsSync(docOutputDir)) {
  fatal(`doc output directory ${docOutputDir} not exits`)
}

if (!fs.existsSync(docTsxTemplageFile)) {
  fatal(`doc tsx template file ${docTsxTemplageFile} not exsts`)
}

function walkSync(dir: string): DocInputInfo[] {
  const docList = []
  const entries = fs.readdirSync(dir, { withFileTypes: true, })
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

function generateRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

function deleteOldFile() {
  log('delete old files')
  const entries = fs.readdirSync(docOutputDir, { withFileTypes: true, })
  for (const entry of entries) {
    if (!entry.name.startsWith('Article') || !entry.name.endsWith('Page.tsx')) {
      continue
    }

    fs.unlinkSync(path.join(docOutputDir, entry.name))
  }
}

deleteOldFile()
const docs = walkSync(docInputDir)
log('generate docs for:', docs)

const templateComponentString = fs.readFileSync(docTsxTemplageFile, 'utf8')
const dynamicRoutes = []

for (const doc of docs) {
  log(`generate tsx file for ${doc.docPath}`)
  try {
    const jsonData = fs.readFileSync(doc.configPath, 'utf8')
    // We have to do that.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const config = JSON.parse(jsonData)
    if (!isDocConfig(config)) {
      fatal(`inalid document config: ${doc.configPath}`)
    }

    const id = generateRandomString(8)
    const component = `Article${id}Page`

    const docPathTrimmed = doc.docPath.replace(/src[\\/]/, '')
    const outputComponentString = templateComponentString
      .replaceAll('// @@DOC_IMPORT_PATH@@', `import Doc from '@/${docPathTrimmed}'`)
      .replace('ArticleTemplatePage', component)
      .replace(/{\/\* @@DOC_CONTENT@@ \*\/}/, '<Doc/>')

    fs.writeFileSync(path.join(docOutputDir, `${component}.tsx`), outputComponentString)

    const { title, } = config as DocConfig
    dynamicRoutes.push({
      importPath: `@/pages/${component}.tsx`,
      path: doc.dirName,
      title,
      component,
    })
  } catch(error) {
    fatal('failed to generate doc:', error)
  }
}

log('generate article dynamic routes:', dynamicRoutes)

const articleTemplateRouteString = fs.readFileSync('./src/pages/article-dynamic-route.template.ts', 'utf8')
const articleDynamicRouteFile = path.join(docOutputDir, 'article-dynamic-route.ts')
const articleDynamicRouteString = articleTemplateRouteString
  .replace('// @@DOC_IMPORT_PATHS@@', dynamicRoutes.map(r => `import ${r.component} from '@/pages/generated/${r.component}.tsx'`).join('\n'))
  .replace('// @@DOC_PATHS@@', dynamicRoutes.map(r => `
    {
      path: '${r.path}',
      title: '${r.title}',
      component: ${r.component},
    },`).join('\n').trim())

fs.writeFileSync(articleDynamicRouteFile, articleDynamicRouteString)
