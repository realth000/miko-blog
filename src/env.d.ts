// Gemini told me.
declare module '*.mdx' {
  import type { MDXComponents } from 'mdx/types'
  import type { ComponentType } from 'react'

  interface MDXProps {
    components?: MDXComponents
    [key: string]: unknown
  }

  const MDXContent: ComponentType<MDXProps>
  export default MDXContent
}
