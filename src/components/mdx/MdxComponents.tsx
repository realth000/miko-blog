import { IconQuote } from '@tabler/icons-react'
import React, { isValidElement, type ReactElement, type ReactNode } from 'react'
import Heading from './Heading'
import type { MDXComponents } from 'mdx/types.js'

function isTag(n: string, child: ReactElement): boolean {
  return (
    child.type === n ||
    (typeof child.type === 'function' && child.type.name === n)
  )
}

function extractClassName(child: ReactElement): string | undefined {
  const props = child.props as object
  if ('className' in props && typeof props.className === 'string') {
    return props.className
  }

  return undefined
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
    <p className="my-article-paragraph" {...props}>
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
      <code
        className="bg-surface-container-high rounded px-1 py-0.5 font-mono"
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }) => {
    return (
      <pre {...props}>
        {React.Children.map(children, (child) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          if (!isValidElement(child)) {
            // Unreachable.
            throw new Error(
              'unreachable child mapping when rendering <pre> tag in mdx',
            )
          }

          if (isTag('code', child)) {
            const cls = extractClassName(child)?.trim() ?? ''

            return (
              <div className="relative">
                {/* Code */}
                <div className="my-article-paragraph bg-surface-container-low gap-2 overflow-x-scroll rounded-md p-4 font-mono">
                  {React.cloneElement(child, {
                    // @ts-expect-error Safe to assign class name here.
                    className: cls,
                  })}
                </div>

                {/* Language info */}
                {cls.length > 1 && (
                  <div className="text-on-surface-variant bg-surface-container-high absolute top-3 right-3 rounded p-2 text-xs">
                    {cls.replace('language-', '')}
                  </div>
                )}
              </div>
            )
          }
          return child
        })}
      </pre>
    )
  },
  hr: ({ children, ...props }) => {
    return (
      <hr
        className="border-tertiary-variant my-article-paragraph border-t-2"
        {...props}
      >
        {children}
      </hr>
    )
  },
  ul: ({ children, ...props }) => {
    return (
      <ul className="my-article-paragraph" {...props}>
        {React.Children.map(children, (child) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          if (!isValidElement(child)) {
            // It is safe to return child here because there are empty nodes in `ol`
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return child
          }
          if (isTag('li', child)) {
            {
              const childClass = extractClassName(child)
              const allClassName = childClass ? `${childClass} --ul` : `--ul`

              return React.cloneElement(child, {
                // @ts-expect-error Safe to assign class name here.
                className: allClassName,
              })
            }
          }

          return child
        })}
      </ul>
    )
  },
  ol: ({ children, ...props }) => {
    let itemCounter = 1

    return (
      <ol className="my-article-paragraph flex flex-col gap-2" {...props}>
        {React.Children.map(children, (child) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          if (!isValidElement(child)) {
            // It is safe to return child here because there are empty nodes in `ol`
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return child
          }
          if (isTag('li', child)) {
            {
              const idx = itemCounter
              itemCounter += 1

              const childClass = extractClassName(child)
              const allClassName = childClass
                ? `${childClass} --idx-${idx.toString()}`
                : `--idx-${idx.toString()}`

              return React.cloneElement(child, {
                // @ts-expect-error Safe to assign class name here.
                className: allClassName,
              })
            }
          }

          return child
        })}
      </ol>
    )
  },
  li: ({ children, className, ...props }) => {
    if (className != undefined && typeof className === 'string') {
      const liRe = /--idx-(?<idx>\d+)/g
      const ulRe = /--ul/g
      const cs = className.split(' ')
      let itemIndex: string | undefined
      let itemUl = false
      const i = cs.findIndex((item) => {
        // Check for li
        const m = liRe.exec(item)
        if (m?.groups != undefined) {
          itemIndex = m.groups.idx
          return true
        }

        // Check for ul
        const m2 = ulRe.exec(item)
        if (m2 != undefined) {
          itemUl = true
          return true
        }

        return false
      })

      if (itemIndex != undefined && i !== -1) {
        // In il
        cs.splice(i, 1)

        return (
          <div className="flex items-center gap-1.5">
            <div className="text-on-surface bg-surface-container-high rounded-sm px-0.75 py-0.5 text-xs">
              {itemIndex}
            </div>
            <li className={cs.join(' ')} {...props}>
              {children}
            </li>
          </div>
        )
      }

      // False positive lint error.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (itemUl && i !== -1) {
        // In ul
        cs.splice(i, 1)
        return (
          <div className="flex items-center gap-2">
            <div className="text-on-surface bg-surface-container-high rounded-full px-1 py-1"></div>
            <li className={cs.join(' ')} {...props}>
              {children}
            </li>
          </div>
        )
      }
    }
    return <li {...props}>{children}</li>
  },
  blockquote: ({ children, ...props }) => {
    return (
      <blockquote
        className="bg-surface-container border-tertiary-container my-article-paragraph rounded border-l-4 px-6 py-5"
        {...props}
      >
        <div>
          <IconQuote className="text-tertiary/50 rotate-180" />
          {children}
          <div className="flex justify-end">
            <IconQuote className="text-tertiary/50" />
          </div>
        </div>
      </blockquote>
    )
  },
} as const
