import fs from 'node:fs'
import { exit } from 'node:process'
import { Language, Node, Parser, Tree } from 'web-tree-sitter'
import { downloadParser } from './download.ts'
import { langNames, getLangWasmFilePath, wasmDir } from './languages.ts'
import { log as __log } from '../shared/log.ts'

function log(...message: unknown[]) {
  __log('[highlighter.ts]', ...message)
}

export async function highlight(
  code: string,
  lang: string,
): Promise<string[] | undefined> {
  await Parser.init()
  const parser = new Parser()

  if (!langNames.has(lang)) {
    log(`warning: ${lang} is not supported, fallback to plain text`)
    return undefined
  }

  const wasmFilePath = getLangWasmFilePath(lang)
  if (!fs.existsSync(wasmFilePath)) {
    log(`wasm file for lang ${lang} not exists, now downloading...`)
    try {
      await downloadParser(lang, wasmDir)
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

  const output: string[] = []

  function traverseTree(tree: Tree) {
    function visitNode(node: Node) {
      if (node.childCount == 0) {
        output.push(
          `[${node.startIndex.toString()}, ${node.endIndex.toString()}]: type=${node.type}, typeId=${node.typeId.toString()}, isNamed=${node.isNamed.toString()}, text="${node.text}"`,
        )
      }

      for (const child of node.children) {
        visitNode(child)
      }
    }

    visitNode(tree.rootNode)
  }

  traverseTree(tree)

  return output
}
