import fs from 'node:fs'
import { exit } from 'node:process'
import { Language, Node, Parser, Tree } from 'web-tree-sitter'
import { downloadParser } from './download.ts'
import {
  langNames,
  getLangWasmFilePath,
  wasmDir,
  isLangKeyword,
} from './languages.ts'
import { log as __log } from '../shared/log.ts'
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
  return code.replaceAll('`', '\\`')
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

  const blocks: HighlightBlock[] = []

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

  return applyhighlightToCode(code, blocks, lang)
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

    const contentPieceType = detectCodePieceType(currentBlock, lang, content)
    if (contentPieceType == 'comment') {
      // Enter comment state, here we read all the contents in comment.
      if (currentBlock.nodeType === '/*') {
        // Multiline comment, eat until the corresponding end token.
        //
        // Currently we only handle multiline comment style `/* */`
        // Perhaps it's time to do a per language highlighting process.
        const endWith = '*/'
        const commentStartPos = codePos
        while (blockPos < highlightBlocks.length) {
          currentBlock = highlightBlocks[blockPos]
          if (currentBlock.nodeType == endWith) {
            break
          }
          blockPos += 1
        }
        const comment = code.slice(commentStartPos, currentBlock.endIndex)
        buffer.push({
          _kind: 'codePiece',
          pieceType: 'comment',
          data: comment,
        })

        // Reset state.
        codePos = currentBlock.endIndex
        blockPos += 1

        if (blockPos < highlightBlocks.length) {
          currentBlock = highlightBlocks[blockPos]
        }

        continue
      } else {
        // Single line comment, eat until '\n'
        const commentStartPos = codePos
        while (codePos < code.length) {
          if (code.at(codePos) == '\n' && codePos >= currentBlock.endIndex) {
            break
          }
          codePos += 1
        }
        const comment = code.slice(commentStartPos, codePos + 1)
        buffer.push({
          _kind: 'codePiece',
          pieceType: 'comment',
          data: comment,
        })

        // Reset state.
        codePos += 1
        // Because we search '\n' in plain text, we may already go through multiple highlight blocks.
        //
        // e.g. In rust: `//! hello\n` is parsed into ["//", "!", " hello\n"], where "!" should be skipped.
        while (blockPos < highlightBlocks.length) {
          currentBlock = highlightBlocks[blockPos]
          if (currentBlock.startIndex < codePos) {
            blockPos += 1
          } else {
            break
          }
        }

        if (blockPos < highlightBlocks.length) {
          currentBlock = highlightBlocks[blockPos]
        }

        continue
      }
    }

    buffer.push({
      _kind: 'codePiece',
      pieceType: detectCodePieceType(currentBlock, lang, content),
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
 * Find the corresponding type to render for a given highlight code block
 *
 * TODO: Now we are mixing all types of languages in one function, if we support more languages in the future,
 * it's hard to check the syntax token for a specified language where some mis-detection will finally happen.
 * But now it is ok.
 *
 * @param block The code piece to check type
 * @param lang Language
 * @param content Code piece text
 * @returns Token type to render
 */
function detectCodePieceType(
  block: HighlightBlock,
  lang: string,
  content: string,
): SharedHighlightedCodePieceType {
  if (isLangKeyword(lang, content)) {
    return 'keyword'
  }

  switch (block.nodeType) {
    // bash
    case 'file_descriptor': {
      return 'keyword'
    }
    // bash
    case 'variable_name':
    case 'identifier': {
      return 'identifier'
    }
    case 'primitive_type': {
      return 'primitiveType'
    }
    case 'string_content': {
      return 'literalString'
    }
    // bash
    case 'raw_string':
    case 'integer_literal':
    case 'number':
    case 'literal': {
      return 'literal'
    }
    case '"': {
      return 'literalString'
    }
    case 'field_identifier': {
      return 'function'
    }
    case 'type_identifier': {
      return 'type'
    }
    case '*/':
    case '/*':
    case '//':
    case 'comment':
    case 'doc_comment': {
      return 'comment'
    }
    default: {
      return 'unknown'
    }
  }
}
