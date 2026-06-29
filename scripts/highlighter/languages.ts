import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { bashConfig } from './languages/bash.ts'
import { cConfig } from './languages/c.ts'
import { cmakeConfig } from './languages/cmake.ts'
import { cppConfig } from './languages/cpp.ts'
import { dartConfig } from './languages/dart.ts'
import { rustConfig } from './languages/rust.ts'
import type { LanguageConfig } from './languages/language-config'

const languages: LanguageConfig[] = [
  bashConfig,
  cConfig,
  cmakeConfig,
  cppConfig,
  dartConfig,
  rustConfig,
]

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const wasmDir = path.resolve(__dirname, 'wasm')

export function getLangWasmFilePath(langConfig: LanguageConfig): string {
  return path.resolve(wasmDir, `${langConfig.name}.wasm`)
}

export function langConfigFromLangName(
  langName: string,
): LanguageConfig | undefined {
  const lowerLangName = langName.toLowerCase()
  for (const lang of languages) {
    if (lang.name == lowerLangName || lang.alias.includes(lowerLangName)) {
      return lang
    }
  }

  return undefined
}
