import { IconCheck, IconCode, IconCopy } from '@tabler/icons-react'
import React, { useEffect, useId, useState } from 'react'
import { getI18n } from '@/i18n/i18n-context'
import { log } from '@/log'
import type { ReactElement } from 'react'

function extractClassName(child: ReactElement): string | undefined {
  const props = child.props as object
  if ('className' in props && typeof props.className === 'string') {
    return props.className
  }

  return undefined
}

function CopyButton({ codeBlockId }: { codeBlockId: string }) {
  const tr = getI18n().articlePage.components.codeBlock.copyButton

  const [justCopied, setJustCopied] = useState(false)

  useEffect(() => {
    if (!justCopied) {
      return
    }

    const timer = setTimeout(() => {
      setJustCopied(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [justCopied])

  return (
    <button
      title={justCopied ? tr.copiedTooltip : tr.tooltip}
      className={`${justCopied ? 'text-primary' : 'hover:text-primary hover:bg-surface-container-high'} flex h-11 w-11 items-center justify-center rounded-t-xl rounded-br-sm rounded-bl-xl`}
      onClick={
        justCopied
          ? undefined
          : () => {
              const code = document.querySelector(
                `code.${codeBlockId}`,
              )?.textContent
              if (code === undefined) {
                return
              }

              navigator.clipboard
                .writeText(code.replace(/\n$/, ''))
                .then(() => {
                  setJustCopied(true)
                })
                .catch((error: unknown) => {
                  log(error)
                })
            }
      }
    >
      {justCopied ? <IconCheck /> : <IconCopy />}
    </button>
  )
}

export default function CodeBlock({
  child,
  ...props
}: {
  child: ReactElement
}) {
  const tr = getI18n().articlePage.components.codeBlock

  let cls = extractClassName(child)?.trim() ?? ''
  const lang = cls.startsWith('language-')
    ? cls.replace('language-', '')
    : undefined
  const codeBlockId = `codeblock-${useId()}`

  cls += ' ' + codeBlockId

  return (
    <div {...props}>
      {/* Language info */}
      <div className="text-on-surface-variant bg-surface-container-low mb-0.5 rounded-t-xl rounded-b-sm">
        <div className="flex items-center">
          <div className="mr-auto ml-0 flex py-2 pl-4">
            <IconCode className="text-secondary"></IconCode>
            <div className="flex items-start gap-2">
              <div className="text-secondary pl-2 text-lg font-bold">
                {tr.title(lang)}
              </div>
              {lang !== undefined && lang.length > 1 && (
                <div className="bg-secondary-container text-secondary rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                  {lang}
                </div>
              )}
            </div>
          </div>
          <CopyButton codeBlockId={codeBlockId} />
        </div>
      </div>
      {/* Code */}
      <div className="bg-surface-container gap-2 overflow-x-scroll rounded-t-sm rounded-b-xl p-4 font-mono">
        {React.cloneElement(child, {
          // @ts-expect-error Safe to assign class name here.
          className: cls,
        })}
      </div>
    </div>
  )
}
