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
  return code.replaceAll('\\`', '`')
}

function renderBlock(pieceType: SharedHighlightedCodePieceType): string {
  switch (pieceType) {
    case 'identifier': {
      return 'text-amber-700 dark:text-amber-400'
    }
    case 'type': {
      return 'text-indigo-700 dark:text-indigo-400'
    }
    case 'function': {
      return 'text-rose-700 dark:text-rose-400'
    }
    case 'primitiveType': {
      return 'text-purple-700 dark:text-purple-400'
    }
    case 'keyword': {
      return 'text-pink-700 dark:text-pink-400'
    }
    case 'literal': {
      return 'text-cyan-700 dark:text-cyan-400'
    }
    case 'literalString': {
      return 'text-emerald-700 dark:text-emerald-400'
    }
    case 'comment': {
      return 'text-gray-700 dark:text-gray-400'
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
