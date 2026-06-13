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
  ]
])

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
