import fs from 'node:fs'
import path from 'node:path'
import { exit } from 'node:process'
import { fileURLToPath } from 'node:url'
import { Language, Node, Parser, Tree } from 'web-tree-sitter'
import { downloadParser } from './download.ts'
import { log as __log } from '../shared/log.ts'

const langNames = new Map<string, string>([
  // Bash like
  ['bash', 'bash'],
  ['shell', 'bash'],
  ['sh', 'bash'],

  ['c', 'c'],

  // cpp
  ['cpp', 'cpp'],
  ['c++', 'cpp'],

  ['dart', 'dart'],

  ['go', 'go'],

  // Js like
  ['javascript', 'javascript'],
  ['js', 'javascript'],

  ['json', 'json'],

  ['rust', 'rust'],

  ['toml', 'toml'],

  // Ts like
  ['typescript', 'typescript'],
  ['ts', 'typescript'],

  ['yaml', 'yaml'],
])

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const wasmDir = path.resolve(__dirname, 'wasm')

function log(...message: unknown[]) {
  __log('[highlighter.ts]', ...message)
}

function traverseTree(tree: Tree) {
  function visitNode(node: Node) {
    if (node.childCount == 0 || true) {
      console.log(
        `[${node.startIndex.toString()}, ${node.endIndex.toString()}]: type=${node.type}, typeId=${node.typeId.toString()}, isNamed=${node.isNamed.toString()}, text="${node.text}"`,
      )
    }

    for (const child of node.children) {
      visitNode(child)
    }
  }

  visitNode(tree.rootNode)
}

export async function highlight(code: string, lang: string) {
  await Parser.init()
  const parser = new Parser()

  if (!langNames.has(lang)) {
    log(`warning: ${lang} is not supported, fallback to plain text`)
    return code
  }

  const wasmFilePath = path.resolve(wasmDir, `${lang}.wasm`)
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
  for (let i = 0; i < treesitterLang.nodeTypeCount; i++) {
    console.log(
      'lang node type:',
      i,
      treesitterLang.nodeTypeForId(i),
      treesitterLang.nodeTypeIsNamed(i),
    )
  }
  parser.setLanguage(treesitterLang)
  const tree = parser.parse(code)
  if (!tree) {
    log('invalid syntax in code')
    exit(1)
  }
  traverseTree(tree)
}

// For testing.
await highlight('const a : &\'staic str  = r#"foo"#;', 'rust')
