import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { log as __log } from '../shared/log.ts'

function log(...message: unknown[]) {
  __log('[download.ts]', ...message)
}

export async function downloadParser(lang: string, saveDir: string) {
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir)
  }
  const destFilePath = path.resolve(process.cwd(), saveDir, `${lang}.wasm`)
  if (fs.existsSync(destFilePath)) {
    log(`skip downloading wasm file for ${lang}, file already exists`)
    return
  }

  const resp = await fetch(
    `https://github.com/tree-sitter/tree-sitter-${lang}/releases/latest/download/tree-sitter-${lang}.wasm`,
  )
  if (!resp.ok || !resp.body) {
    throw new Error(
      `failed to download ${lang} wasm parser: code=${resp.status.toString()}`,
    )
  }

  log('save wasm at', destFilePath)

  const fileStream = fs.createWriteStream(destFilePath)
  const inStream = Readable.fromWeb(resp.body)

  await finished(inStream.pipe(fileStream))
}
