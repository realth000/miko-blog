import fs from 'node:fs'
import { exit } from 'node:process'
import { Language, Node, Parser, Tree } from 'web-tree-sitter'
import { downloadParser } from './download.ts'
import {
  getLangWasmFilePath,
  langConfigFromLangName,
  wasmDir,
} from './languages.ts'
import { log as __log } from '../shared/log.ts'
import type { LanguageConfig } from './languages/language-config.ts'
import type {
  SharedHighlightedCode,
  SharedHighlightedCodePieceType,
} from '../../shared/mdx-highlighted-code-blocks.ts'

function log(...message: unknown[]) {
  __log('[highlighter.ts]', ...message)
}

export interface HighlightBlock {
  startIndex: number
  endIndex: number
  nodeType: string
  nodeTypeId: number
  isNamed: boolean
  isVisible: boolean
  text: string
  parentType: string | undefined
}

/**
 * Escape characters to make code safe to embed as HighlightedCode component args.
 *
 * The corresponding decode proces is the same name function when decoding code arg.
 *
 * @param code The code to escape for embed as HighlightedCode component args.
 * @returns
 */
export function safeHighlighedCode(code: string): string {
  return Buffer.from(code, 'utf8').toString('base64')
}

/**
 *
 * @param code Code text to render.
 * @param lang The language name. Can be anything that well-known, like c++ or cpp for cpp,
 *             shell or bash or sh for bash. The name will be canonicalized later when parsing,
 *             but still used when displaying in the article because it is what the user wants.
 * @returns Promise of highlighted jsx component if success, or `undefined` if `lang` is
 *          unsupported.
 */
export async function highlight(
  code: string,
  lang: string,
): Promise<string | undefined> {
  await Parser.init()
  const parser = new Parser()

  const langConfig = langConfigFromLangName(lang)

  if (!langConfig) {
    log(`warning: ${lang} is not supported, fallback to plain text`)
    return undefined
  }

  const wasmFilePath = getLangWasmFilePath(langConfig)
  if (!fs.existsSync(wasmFilePath)) {
    log(`wasm file for lang ${lang} not exists, now downloading...`)
    try {
      await downloadParser(langConfig.name, wasmDir)
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

  const blocks: HighlightBlock[] = []

  function traverseTree(tree: Tree, langConfig: LanguageConfig) {
    function visitNode(node: Node) {
      if (langConfig.nodeTypeMap.has(node.type)) {
        blocks.push({
          startIndex: node.startIndex,
          endIndex: node.endIndex,
          nodeType: node.type,
          nodeTypeId: node.typeId,
          isNamed: node.isNamed,
          isVisible: node.isNamed,
          text: node.text,
          parentType: node.parent?.type,
        })
      } else {
        for (const child of node.children) {
          visitNode(child)
        }
      }
    }

    visitNode(tree.rootNode)
  }

  traverseTree(tree, langConfig)
  return applyhighlightToCode(code, blocks, lang, langConfig)
}

/**
 *
 * @param code The original code text.
 * @param highlightBlocks Recognized code blocks to highlight.
 * @param lang Language name, not canonicalized because it is used to display.
 * @returns A piece of jsx code that contains the jsx component carrying
 *          highlighted code.
 */
function applyhighlightToCode(
  code: string,
  highlightBlocks: HighlightBlock[],
  lang: string,
  langConfig: LanguageConfig,
): string {
  if (code.length === 0 || highlightBlocks.length === 0) {
    return code
  }
  const buffer: SharedHighlightedCode[] = []
  let codePos = 0
  let blockPos = 0
  let currentBlock = highlightBlocks[blockPos]

  for (;;) {
    if (codePos >= code.length) {
      break
    }

    if (codePos < currentBlock.startIndex) {
      // Before the current block to highlight, collect plain text.
      buffer.push({
        _kind: 'codeText',
        data: code.slice(codePos, currentBlock.startIndex),
      })
      codePos = currentBlock.startIndex
      continue
    } else if (codePos >= currentBlock.endIndex) {
      // All blocks are highlighted.
      buffer.push({
        _kind: 'codeText',
        data: code.slice(codePos),
      })
      break
    }

    const content = code.slice(currentBlock.startIndex, currentBlock.endIndex)

    const contentPieceType = mapPieceType(currentBlock, langConfig)
    buffer.push({
      _kind: 'codePiece',
      pieceType: contentPieceType,
      data: content,
    })

    codePos = currentBlock.endIndex
    blockPos += 1

    if (blockPos < highlightBlocks.length) {
      currentBlock = highlightBlocks[blockPos]
    }
  }

  return `<HighlightedCode lang={'${lang}'} code={String.raw\`${safeHighlighedCode(JSON.stringify(buffer))}\`}/>`
}

/**
 * Map tree-sitter token type to highlightable type.
 *
 * @param block Code block to highlight.
 * @param langConfig Current language config.
 * @returns The highlight type to use.
 */
function mapPieceType(
  block: HighlightBlock,
  langConfig: LanguageConfig,
): SharedHighlightedCodePieceType {
  const mappedType = langConfig.nodeTypeMap.get(block.nodeType)
  if (mappedType === undefined) {
    return 'unknown'
  }

  if (mappedType === 'operator') {
    const parentNodeType = block.parentType
    if (
      parentNodeType !== undefined &&
      langConfig.genericNodeNames.includes(parentNodeType)
    ) {
      // Generic type.
      return 'unknown'
    }
  }

  return mappedType
}
