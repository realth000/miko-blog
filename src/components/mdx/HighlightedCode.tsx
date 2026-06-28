import RenderError from '../RenderError'
import CodeBlock from './CodeBlock'
import type {
  SharedHighlightedCode,
  SharedHighlightedCodePieceType,
} from '@shared/mdx-highlighted-code-blocks'

/**
 * Unescape characters to restore the original code from HighlightedCode component args.
 *
 * The corresponding encode proces is the same name function when codegen.
 *
 * @param code The code to unescape used as HighlightedCode component args.
 * @returns
 */
function safeHighlighedCode(code: string): string {
  // Ensured to be single byte.
  // eslint-disable-next-line unicorn/prefer-code-point
  const bytes = Uint8Array.from(atob(code), (m) => m.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function renderBlock(pieceType: SharedHighlightedCodePieceType): string {
  switch (pieceType) {
    case 'identifier': {
      return 'text-slate-600 dark:text-cyan-100'
    }
    case 'operator': {
      // return 'text-blue-600 dark:text-blue-400'
      return ''
    }
    case 'field': {
      return 'text-rose-700 dark:text-rose-400'
    }
    case 'keyword': {
      return 'text-sky-600 dark:text-sky-400'
    }
    case 'function': {
      return 'text-indigo-600 dark:text-indigo-400'
    }
    case 'type':
    case 'primitiveType': {
      return 'text-amber-600 dark:text-amber-400'
    }
    case 'literalString': {
      return 'text-emerald-600 dark:text-emerald-400'
    }
    case 'literal': {
      return 'text-purple-600 dark:text-purple-400'
    }
    case 'comment': {
      return 'text-slate-400 dark:text-slate-400'
    }
    case 'unknown': {
      return ''
    }
    default: {
      const guard: never = pieceType
      return guard
    }
  }
}

export default function HighlightedCode({
  lang,
  code,
  ...props
}: {
  lang: unknown
  code: unknown
  [key: string]: unknown
}) {
  if (typeof code != 'string') {
    return (
      <RenderError
        message={`Expected \`code\` in \`HighlightedCode\` to be string, found ${typeof code}`}
      />
    )
  }

  let langName: string | undefined
  if (typeof lang == 'string' && lang.trim().length > 0) {
    langName = lang.trim()
  }

  const content = JSON.parse(
    safeHighlighedCode(code),
  ) as SharedHighlightedCode[]

  return (
    <pre className="my-article-paragraph" {...props}>
      <CodeBlock
        child={
          <code
            className={langName === undefined ? '' : `language-${langName}`}
          >
            {content.map((block, idx) => {
              // Bad ternary.
              // eslint-disable-next-line unicorn/prefer-ternary
              if (block._kind == 'codeText') {
                return <span key={idx}>{block.data}</span>
              } else {
                return (
                  <span key={idx} className={renderBlock(block.pieceType)}>
                    {block.data}
                  </span>
                )
              }
            })}
          </code>
        }
      />
    </pre>
  )
}
