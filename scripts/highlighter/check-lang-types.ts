import fs from 'node:fs'
import { exit } from 'node:process'
import { Language, Parser } from 'web-tree-sitter'
import { downloadParser } from './download.ts'
import {
  getLangWasmFilePath,
  langConfigFromLangName,
  wasmDir,
} from './languages.ts'
import { log } from '../shared/log.ts'

async function printLangTypes(lang: string) {
  await Parser.init()

  const langConfig = langConfigFromLangName(lang)

  if (!langConfig) {
    log(`unsupported lang ${lang}`)
    exit(1)
  }

  const wasmFilePath = getLangWasmFilePath(langConfig)
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
      'type:',
      treesitterLang.nodeTypeForId(i),
      'isNamed:',
      treesitterLang.nodeTypeIsNamed(i),
      'isVisible:',
      treesitterLang.nodeTypeIsVisible(i),
    )
  }
}

if (process.argv.length < 3) {
  log('language name not set')
  exit(1)
}

const lang = process.argv[2]
await printLangTypes(lang)
