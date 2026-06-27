import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { log as __log } from '../shared/log.ts'

function log(...message: unknown[]) {
  __log('[download.ts]', ...message)
}

const overridedDownloadUrls = new Map<string, string>([
  [
    'cmake',
    'https://raw.githubusercontent.com/realth000/TreeSitterWasmArtifacts/refs/heads/master/parser/tree-sitter-cmake.wasm',
  ],
  [
    'dart',
    'https://raw.githubusercontent.com/realth000/TreeSitterWasmArtifacts/refs/heads/master/parser/tree-sitter-dart.wasm',
  ],
  [
    'cpp',
    'https://github.com/tree-sitter/tree-sitter-cpp/releases/latest/download/tree-sitter-cpp.wasm',
  ],
  [
    'toml',
    'https://github.com/tree-sitter-grammars/tree-sitter-toml/releases/latest/download/tree-sitter-toml.wasm',
  ],
  [
    'yaml',
    'https://github.com/tree-sitter-grammars/tree-sitter-yaml/releases/latest/download/tree-sitter-yaml.wasm',
  ],
])

export async function downloadParser(lang: string, saveDir: string) {
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir)
  }
  const destFilePath = path.resolve(process.cwd(), saveDir, `${lang}.wasm`)
  if (fs.existsSync(destFilePath)) {
    log(`skip downloading wasm file for ${lang}, file already exists`)
    return
  }

  const downloadUrl =
    overridedDownloadUrls.get(lang) ??
    `https://github.com/tree-sitter/tree-sitter-${lang}/releases/latest/download/tree-sitter-${lang}.wasm`

  const resp = await fetch(downloadUrl)
  if (!resp.ok || !resp.body) {
    throw new Error(
      `failed to download ${lang} wasm parser: code=${resp.status.toString()}; url=${downloadUrl}`,
    )
  }

  log('save wasm at', destFilePath)

  const fileStream = fs.createWriteStream(destFilePath)
  const inStream = Readable.fromWeb(resp.body)

  await finished(inStream.pipe(fileStream))
}
