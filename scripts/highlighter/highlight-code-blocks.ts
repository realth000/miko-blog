import { highlight, safeHighlighedCode } from './highlighter.ts'
import { log } from '../shared/log.ts'
import type { SharedHighlightedCode } from '@shared/mdx-highlighted-code-blocks.ts'

interface CodeBlock {
  _kind: 'codeBlock'
  index: number
  lang: string | undefined
  data: string[]
  highlighted: string | undefined
}

interface Text {
  _kind: 'text'
  data: string[]
}

type DocSegment = CodeBlock | Text

/**
 * Highlight code block.
 *
 * Pass in the content of a code block, this function will recognize all code piece that can be highlighted and
 * mark them with associated token type.
 *
 * @param code Code to highlight.
 * @returns JSX code that contains highlight components with highlight configuration based on input `code`.
 */
export async function highlightCodeBlocks(code: string): Promise<string> {
  // Here we highlight the supported code blocks in document `data`, and returns the highlighted content string.

  // Flag indicating in multiline code block or not.
  let inCodeBlock = false
  let codeBlockCount = 0
  let currentSegment: DocSegment | undefined
  let tmpBlocks: string[] = []
  const docSegments: DocSegment[] = []

  for (const line of code.split('\n')) {
    if (line.trim().startsWith('```')) {
      // Enter or leave a code block.
      inCodeBlock = !inCodeBlock

      if (inCodeBlock) {
        // Here we entered a new code block, populate a new code block segment.
        if (currentSegment !== undefined) {
          // Finish the last segment.
          currentSegment.data = tmpBlocks
          docSegments.push(currentSegment)
          tmpBlocks = []
          currentSegment = undefined
        }

        let lang: string | undefined
        codeBlockCount += 1
        const langStr = line.split('```', 2)[1].trim()
        if (langStr.length > 0) {
          lang = langStr
        }

        currentSegment = {
          _kind: 'codeBlock',
          lang: lang,
          index: codeBlockCount,
          data: [],
          highlighted: undefined,
        }
      } else {
        // Here we leaved a code block.
        if (currentSegment !== undefined) {
          currentSegment.data = tmpBlocks
          docSegments.push(currentSegment)
          tmpBlocks = []
          currentSegment = undefined
        }
      }

      continue
    }

    if (inCodeBlock) {
      // Here we in the code block, process code block ones.
      tmpBlocks.push(line)
    } else {
      // Here we are in plain text.

      // Assign the current segment if not set.
      currentSegment ??= {
        _kind: 'text',
        data: [],
      }

      tmpBlocks.push(line)
    }
  }

  // Process the last one, always plain text.
  if (currentSegment !== undefined) {
    currentSegment.data = tmpBlocks
    tmpBlocks = []
    docSegments.push(currentSegment)
    currentSegment = undefined
  }

  for (const [idx, seg] of docSegments.entries()) {
    if (seg._kind != 'codeBlock') {
      continue
    }

    // Highlight the code block.
    if (seg.lang === undefined) {
      // Do not highlight it.
      seg.highlighted = undefined
    } else {
      try {
        const highlightResult = await highlight(seg.data.join('\n'), seg.lang)
        if (highlightResult === undefined) {
          log(
            `empty highlight result for idx=${idx.toString()} code block, maybe the language is not supported`,
          )
          seg.highlighted = undefined
        } else {
          seg.highlighted = highlightResult
        }
      } catch (error) {
        log(`failed to highlight idx=${idx.toString()} code block:`, error)
      }
    }
  }

  const docs: string[] = []

  for (const seg of docSegments) {
    if (seg._kind === 'text') {
      docs.push(seg.data.join('\n'))
    } else {
      const code: SharedHighlightedCode[] = [
        {
          _kind: 'codeText',
          data: seg.data.join('\n'),
        },
      ]
      // Not highlighted, maybe language is not supported.
      // Still we place the code in `HighlightedCode` to render it with styles close to
      // regular known languages.
      docs.push(
        seg.highlighted ??
          `<HighlightedCode code={String.raw\`${safeHighlighedCode(JSON.stringify(code))}\`}/>`,
      )
    }
  }

  return docs.join('')
}
