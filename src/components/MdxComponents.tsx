import { hashObject } from '@/utils/encoding.ts'
import type { MDXComponents } from 'mdx/types.js'

function generateAnchor(object: unknown): string {
  return `anchor-${hashObject(object)}`
}

/**
 * MDXComponents not works in wrapper like:
 * 
 * ```jsx
 * export function Wrapper = () => (<MDXProvider components={mdxComponents}>{children}</MDXProvider>)
 * 
 * <Wrapper>{children}</Wrapper>
 * ```
 * 
 * where `children` is the document
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => {
    const id = generateAnchor(children)
    return <h1 {...props} id={id}><a href={`#${id}`}>{children}</a></h1>
  },
  h2: ({ children, ...props }) => {
    const id = generateAnchor(children)
    return <h2 {...props} id={id}><a href={`#${id}`}>{children}</a></h2>
  },
  h3: ({ children, ...props }) => {
    const id = generateAnchor(children)
    return <h3 {...props} id={id}><a href={`#${id}`}>{children}</a></h3>
  },
  h4: ({ children, ...props }) => {
    const id = generateAnchor(children)
    return <h4 {...props} id={id}><a href={`#${id}`}>{children}</a></h4>
  },
  h5: ({ children, ...props }) => {
    const id = generateAnchor(children)
    return <h5 {...props} id={id}><a href={`#${id}`}>{children}</a></h5>
  },
  h6: ({ children, ...props }) => {
    const id = generateAnchor(children)
    return <h6 {...props} id={id}><a href={`#${id}`}>{children}</a></h6>
  },
}