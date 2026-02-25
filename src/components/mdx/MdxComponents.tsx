import { type ReactNode } from 'react'
import Heading from './Heading'
import type { MDXComponents } from 'mdx/types.js'

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
export const MDX_COMPONENTS: MDXComponents = {
  h1: ({ children, ...props }) => (
    <Heading
      level={1}
      children={children as ReactNode}
      className="text-4xl"
      {...props}
    />
  ),
  h2: ({ children, ...props }) => (
    <Heading
      level={2}
      children={children as ReactNode}
      className="text-3xl"
      {...props}
    />
  ),
  h3: ({ children, ...props }) => (
    <Heading
      level={3}
      children={children as ReactNode}
      className="text-2xl"
      {...props}
    />
  ),
  h4: ({ children, ...props }) => (
    <Heading
      level={4}
      children={children as ReactNode}
      className="text-xl"
      {...props}
    />
  ),
  h5: ({ children, ...props }) => (
    <Heading
      level={5}
      children={children as ReactNode}
      className="text-lg"
      {...props}
    />
  ),
  h6: ({ children, ...props }) => (
    <Heading
      level={6}
      children={children as ReactNode}
      className="text-base"
      {...props}
    />
  ),
  p: ({ children, ...props }) => (
    <p className="my-4" {...props}>
      {' '}
      {children}{' '}
    </p>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {' '}
      {children}{' '}
    </em>
  ),
  code: ({ children, ...props }) => {
    return (
      <code className="rounded bg-gray-600 px-1 py-0.5" {...props}>
        {children}
      </code>
    )
  },
} as const
