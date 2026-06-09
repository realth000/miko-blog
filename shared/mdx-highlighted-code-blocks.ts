export type SharedHighlightedCodePieceType =
  | 'identifier'
  | 'type'
  | 'function'
  | 'primitiveType'
  | 'keyword'
  | 'literal'
  | 'literalString'
  | 'comment'
  | 'unknown'

/**
 * Shared model represents either:
 *
 * 1. Code that can be highlighted, we know what type the code is.
 * 2. Code text that does not need styling, render it as plain text.
 *
 * This model is used both in cli and app.
 *
 * When codegen, cli produce the json representation of this type as mdx
 * component parameter. Later in the app, these types are deserialized
 * and rendered with stylings (if needed).
 */
export type SharedHighlightedCode =
  | SharedHighlightedCodePiece
  | SharedHighlightedText

/**
 * Code text that should be highlighted with color.
 */
export interface SharedHighlightedCodePiece {
  _kind: 'codePiece'

  /**
   * The code piece type.
   *
   * Identifier, primitive_type, keyword, ...
   *
   * According to this field, `data` will be rendered in different colors.
   */
  pieceType: SharedHighlightedCodePieceType

  /**
   * Code to highlight
   */
  data: string
}

/**
 * Plain text that can directly display in the document.
 */
export interface SharedHighlightedText {
  _kind: 'codeText'
  data: string
}
