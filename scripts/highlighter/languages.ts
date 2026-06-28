import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { bashConfig } from './languages/bash.ts'
import { cConfig } from './languages/c.ts'
import { cppConfig } from './languages/cpp.ts'
import { dartConfig } from './languages/dart.ts'
import { rustConfig } from './languages/rust.ts'
import type { LanguageConfig } from './languages/language-config'

const languages: LanguageConfig[] = [
  bashConfig,
  cConfig,
  cppConfig,
  dartConfig,
  rustConfig,
]
// prettier-ignore
const _langKeywords = new Map<string, string[]>([
  [
    'cmake',
    [
      'if', 'else', 'elseif', 'endif', 'foreach', 'endforeach', 'while', 'endwhile', 'macro', 'endmacro', 'function',
      'endfunction', 'return', 'block', 'endblock', 'break', 'continue', 'set', 'unset', 'option', 'cmake_minimum_required',
      'project', 'add_executable', 'add_library', 'target_link_libraries', 'target_include_directories', 'target_compile_definitions',
      'target_compile_options', 'target_sources', 'find_package', 'find_library', 'find_path', 'find_file', 'find_program', 'include',
      'add_subdirectory', 'configure_file', 'file', 'string', 'list', 'math', 'message', 'execute_process', 'include_directories',
      'link_directories', 'add_definitions', 'compile_definitions', 'install', 'enable_testing', 'add_test', 'set_target_properties',
      'get_target_property', 'set_property', 'get_property', 'target_compile_features', 'add_custom_command', 'add_custom_target',
      'add_dependencies', 'aux_source_directory', 'define_property', 'mark_as_advanced', 'site_name', 'variable_watch', 'PUBLIC',
      'PRIVATE', 'INTERFACE', 'KEYWORDS', 'COMPONENTS', 'REQUIRED', 'OPTIONAL', 'MODULE', 'SHARED', 'STATIC', 'OBJECT', 'INTERFACE',
      'EXCLUDE_FROM_ALL', 'SYSTEM', 'BEFORE', 'AFTER', 'STATUS', 'WARNING', 'AUTHOR_WARNING', 'SEND_ERROR', 'FATAL_ERROR', 'DEPRECATION',
    ],
  ],
  [
    'bash',
    [
      'if', 'fi', 'case', 'esac', 'while', 'when', 'do', 'done', 'then', 'return', 'exit', 'echo', '>&', '$', '$(', ')', '(', '}', '{'
    ]
  ],
]
)

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
