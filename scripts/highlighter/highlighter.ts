import fs from 'node:fs'
import { exit } from 'node:process'
import { Language, Node, Parser, Tree } from 'web-tree-sitter'
import { downloadParser } from './download.ts'
import { langNames, getLangWasmFilePath, wasmDir } from './languages.ts'
import { log as __log } from '../shared/log.ts'

function log(...message: unknown[]) {
  __log('[highlighter.ts]', ...message)
}

export interface HighlighBlock {
  startIndex: number
  endIndex: number
  nodeType: string
  nodeTypeId: number
  isNamed: boolean
  isVisible: boolean
  text: string
}

export async function highlight(
  code: string,
  lang: string,
): Promise<string | undefined> {
  await Parser.init()
  const parser = new Parser()

  const canonicalizeLang = langNames.get(lang)

  if (!canonicalizeLang) {
    log(`warning: ${lang} is not supported, fallback to plain text`)
    return undefined
  }

  const wasmFilePath = getLangWasmFilePath(canonicalizeLang)
  if (!fs.existsSync(wasmFilePath)) {
    log(`wasm file for lang ${lang} not exists, now downloading...`)
    try {
      await downloadParser(canonicalizeLang, wasmDir)
    } catch (error) {
      log(`failed to download wasm file for lang ${lang}:`, error)
      exit(1)
    }
  }

  const treesitterLang = await Language.load(wasmFilePath)
  parser.setLanguage(treesitterLang)
  const tree = parser.parse(code)
  if (!tree) {
    log('invalid syntax in code')
    exit(1)
  }

  const blocks: HighlighBlock[] = []

  function traverseTree(tree: Tree) {
    function visitNode(node: Node) {
      if (node.childCount == 0) {
        blocks.push({
          startIndex: node.startIndex,
          endIndex: node.endIndex,
          nodeType: node.type,
          nodeTypeId: node.typeId,
          isNamed: node.isNamed,
          isVisible: node.isNamed,
          text: node.text,
        })
      }

      for (const child of node.children) {
        visitNode(child)
      }
    }

    visitNode(tree.rootNode)
  }

  traverseTree(tree)

  return applyHighlihgtToCode(code, blocks)
}

function applyHighlihgtToCode(
  code: string,
  highlightBlocks: HighlighBlock[],
): string {
  if (code.length === 0 || highlightBlocks.length === 0) {
    return code
  }

  const buffer: string[] = []
  let codePos = 0
  let blockPos = 0
  let currentBlock = highlightBlocks[blockPos]

  for (;;) {
    if (codePos >= code.length) {
      break
    }

    if (codePos < currentBlock.startIndex) {
      // Before the current block to highlight, collect plain text.
      buffer.push(code.slice(codePos, currentBlock.startIndex))
      codePos = currentBlock.startIndex
      continue
    } else if (codePos >= currentBlock.endIndex) {
      // All blocks are highlighted.
      buffer.push(code.slice(codePos))
      break
    }

    const content = code.slice(currentBlock.startIndex, currentBlock.endIndex)

    // Here we get into the current highlight block.
    if (currentBlock.nodeType === 'identifier') {
      buffer.push(`<span className="text-amber-700">{'${content}'}</span>`)
    } else if (currentBlock.nodeType === 'primitive_type') {
      buffer.push(`<span className="text-amber-700">{'${content}'}</span>`)
    } else {
      buffer.push(`<span>{'${content}'}</span>`)
    }

    codePos = currentBlock.endIndex
    blockPos += 1

    if (blockPos < highlightBlocks.length) {
      currentBlock = highlightBlocks[blockPos]
    }
  }

  return '<pre className="font-mono">' + buffer.join('') + '</pre>'
}
