import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const langNames = new Map<string, string>([
  // Bash like
  ['bash', 'bash'],
  ['shell', 'bash'],
  ['sh', 'bash'],

  ['c', 'c'],

  // cpp
  ['cpp', 'cpp'],
  ['c++', 'cpp'],

  // Dart is unavailable, we need a latest prebuild wasm file.
  // ['dart', 'dart'],

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

export const wasmDir = path.resolve(__dirname, 'wasm')

export function getLangWasmFilePath(lang: string): string {
  return path.resolve(wasmDir, `${lang}.wasm`)
}
