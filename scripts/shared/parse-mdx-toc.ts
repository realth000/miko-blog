import fs from 'node:fs'
import { hashObject as hashObjectInCli } from './hash-object.ts'
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

/**
 * Parse table of contents from a given mdx file path.
 *
 * Return a modified document for deeplinking that injected anchor ids used later when parsing as MDX components.
 * 
 * e.g. for title '# Foo', the title in returned `doc` is something like `# Foo {anchor_id}`
 *   with appended anchor id. The anchor id is a hash string wrapped in js block so that when parsing MDX nodes,
 *   whe node is converted to plain hash text which will be recognized and removed from title.
 *
 * @param filePath path to the mdx file.
 * @returns table of contents and updated document text.
 */
export function parseMdxTableOfContentEx(filePath: string): { toc: MdxContentTable, doc: string } {
  const data = fs.readFileSync(filePath, 'utf8')

  // Here we parse html contents in the simplest way: 
  // Assume all contents are those `h*` tags and no escaping in the document.

  const re = /^(?<level>#+) (?<title>.*)(\r)?$/

  const doc: string[]= []

  const headers : MdxContentTable = data.split('\n').map(line => {
    const reResult = re.exec(line)
    if (!reResult?.groups) {
      doc.push(line)
      return
    }

    // Inject anchor id hash in js block.
    doc.push(`${line.trim()}{${hashObjectInCli(line)}}`)

    return {
      level: reResult.groups.level.length,
      title: reResult.groups.title,
    }
  }).filter((x) => x !== undefined)

  return  { toc: headers, doc: doc.join('\n')  }
}