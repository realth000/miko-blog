import { fatal, log } from './shared/log.ts'
import { parseMdxTableOfContent } from './shared/parse-mdx-toc.ts'

if (process.argv.length < 3) {
  fatal('mdx file path not specified in args')
}

const filePath = process.argv[2]
const contents = parseMdxTableOfContent(filePath)

log(contents)