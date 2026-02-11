import fs from 'node:fs'
import type { MdxContentTable } from './mdx-content-table.ts'

export function parseMdxTableOfContent(filePath: string): MdxContentTable {
  const data = fs.readFileSync(filePath, 'utf8')

  // Here we parse html contents in the simplest way: 
  // Assume all contents are those `h*` tags and no escaping in the document.

  const re = /^(?<level>#+) (?<title>.*)(\r)?$/

  const headers : MdxContentTable = data.split('\n').map(line => {
    const reResult = re.exec(line)
    if (!reResult?.groups) {
      return
    }

    return {
      level: reResult.groups.level.length,
      title: reResult.groups.title,
    }
  }).filter((x) => x !== undefined)

  return headers
}