import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const langNames = new Map<string, string>([
  // Bash like
  ['bash', 'bash'],
  ['shell', 'bash'],
  ['sh', 'bash'],

  ['c', 'c'],

  ['cmake', 'cmake'],

  // cpp
  ['cpp', 'cpp'],
  ['c++', 'cpp'],

  // dart
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

// prettier-ignore
const langKeywords = new Map<string, string[]>([
  [
    'rust',
    [
      '_', 'as', 'async', 'await', 'break', 'const', 'continue', 'crate', 'dyn', 'else', 'enum', 'extern', 'false',
      'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self',
      'Self', 'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while', 'async', 'await',
      'dyn',
    ],
  ],
  [
    'c',
    [
      "alignas", "alignof", "auto", "bool", "break", "case", "char", "const", "constexpr", "continue", "default", "do",
      "double", "else", "enum", "extern", "false", "float", "for", "goto", "if", "inline", "int", "long", "nullptr",
      "register", "restrict", "return", "short", "signed", "sizeof", "static", "static_assert", "struct", "switch",
      "thread_local", "true", "typedef", "typeof", "typeof_unqual", "union", "unsigned", "void", "volatile", "while",
      "_Alignas", "_Alignof", "_Atomic", "_BitInt", "_Bool", "_Complex", "_Decimal128", "_Decimal32", "_Decimal64",
      "_Generic", "_Imaginary", "_Noreturn", "_Static_assert", "_Thread_local", "_Alignas", "_Alignof", "_Atomic",
      "_BitInt", "_Bool", "_Complex", "_Decimal128", "_Decimal32", "_Decimal64", "_Generic", "_Imaginary", "_Noreturn",
      "_Static_assert", "_Thread_local", "#include", "#if", "#else", "#ifdef", "#ifndef", "#endif", "#define"
    ],
  ],
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
    'cpp',
    [
      'alignas', 'alignof', 'and', 'and_eq', 'asm', 'atomic_cancel', 'atomic_commit', 'atomic_noexcept', 'auto',
      'bitand', 'bitor', 'bool', 'break', 'case', 'catch', 'char', 'char8_t', 'char16_t', 'char32_t', 'class', 'compl',
      'concept', 'const', 'consteval', 'constexpr', 'constinit', 'const_cast', 'continue', 'contract_assert',
      'co_await', 'co_return', 'co_yield', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else',
      'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long',
      'mutable', 'namespace', 'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private',
      'protected', 'public', 'reflexpr', 'register', 'reinterpret_cast', 'requires', 'return', 'short', 'signed',
      'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'synchronized', 'template', 'this',
      'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual',
      'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq',
    ],
  ],
  [
    'bash',
    [
      'if', 'fi', 'case', 'esac', 'while', 'when', 'do', 'done', 'then', 'return', 'exit', 'echo', '>&', '$', '$(', ')', '(', '}', '{'
    ]
  ],
  [
    'dart',
    [
      'abstract', 'as', 'assert', 'async', 'await', 'base', 'break', 'case', 'catch', 'class', 'const', 'continue', 'covariant',
      'default', 'deferred', 'do', 'dynamic', 'else', 'enum', 'export', 'extends', 'extension', 'external', 'factory', 'false',
      'final', 'final', 'finally', 'for', 'Function', 'get', 'hide', 'if', 'implements', 'import', 'in', 'interface', 'is',
      'late', 'library', 'mixin', 'new', 'null', 'of', 'on', 'operator', 'part', 'required', 'rethrow', 'return', 'sealed',
      'set', 'show', 'static', 'super', 'switch', 'sync', 'this', 'throw', 'true', 'try', 'type', 'typedef', 'var', 'void',
      'when', 'with', 'while', 'yield',
    ]
  ],
]
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const wasmDir = path.resolve(__dirname, 'wasm')

export function getLangWasmFilePath(lang: string): string {
  return path.resolve(wasmDir, `${lang}.wasm`)
}

/**
 * Check is text a keyword in language.
 *
 * @param lang Language name, may not be canonicalized.
 * @param text Text to check if is keyword or not.
 * @returns True if is keyword, not false if not.
 */
export function isLangKeyword(lang: string, text: string): boolean {
  const langName = langNames.get(lang)
  if (!langName) {
    return false
  }

  const keywordList = langKeywords.get(langName)
  if (!keywordList) {
    return false
  }

  return keywordList.includes(text)
}
