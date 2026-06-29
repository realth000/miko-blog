import type { SharedHighlightedCodePieceType } from '@shared/mdx-highlighted-code-blocks'

export function createNodeTypeMap(
  entries: [string, SharedHighlightedCodePieceType][],
): Map<string, SharedHighlightedCodePieceType> {
  return new Map(entries)
}

/**
 * The common language config when highlighting code in a language.
 */
export interface LanguageConfig {
  /**
   * Lanauge name.
   *
   * Use name to specify a language.
   *
   * Note that the name MUST be in lowercase letters.
   */
  name: string

  /**
   * Other well known languages names.
   *
   * Use this language to match the language name in user input.
   *
   * Note that the alias MUST be in lowercase letters.
   *
   * e.g. For cpp we have 'cplusplus', 'c++'.
   */
  alias: string[]

  /**
   * Direct wasm parser download url.
   *
   * We download from `tree-sitter/tree-sitter-${lang}/release/latest/download/tree-sitter-${lang}.wasm`
   * by default.
   *
   * Use this field to override the default download url.
   */
  parserDownloadUrl: string | undefined

  /**
   * The node type mappers.
   *
   * After parsed via tree-sitter, we have a lots of token names.
   * This field defines how we map a certain token name to the type we provide when highlighting.
   *
   * e.g. For bash:
   *   'file_descriptor' is highlighted as 'keyword'.
   *   'variable_name' is highlighted as 'idnetifier'.
   */
  nodeTypeMap: Map<string, SharedHighlightedCodePieceType>

  /**
   * Generic node names in the language.
   *
   * This field is used to distinguish generic punctucation and general operators.
   *
   * e.g. In cpp, the '<' and '>' in 'Foo<bar>' is in generic node and are not operators.
   *
   * Different languages may use different node names.
   */
  genericNodeNames: string[]

  /**
   * Some language parsers do not gracefully handle all keywords, that is, a keyword is recognized as
   * other token. Use this field when token not matches but the content text is keyword then give it
   * a keyword highlight.
   *
   * Note that in the future version we have use optional callbacks to patch on parsed tokens instead
   * of hard-coding text replacement.
   */
  extraKeywords: string[]
}
