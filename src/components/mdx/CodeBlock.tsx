import { IconCheck, IconCode, IconCopy } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { getI18n } from '@/i18n/i18n-context'
import { log } from '@/log'
import { hashObject } from '@/utils/encoding'
import type { ReactElement } from 'react'

function extractClassName(child: ReactElement): string | undefined {
  const props = child.props as object
  if ('className' in props && typeof props.className === 'string') {
    return props.className
  }

  return undefined
}

function CopyButton({ codeBlockId }: { codeBlockId: string }) {
  const tr = getI18n().acticlePage.components.codeBlock.copyButton

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
      className={`${justCopied ? 'text-primary' : 'hover:text-primary hover:bg-surface-container-high'} flex h-11 w-11 items-center justify-center rounded-lg`}
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
                .writeText(code.trim())
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
  const tr = getI18n().acticlePage.components.codeBlock

  let cls = extractClassName(child)?.trim() ?? ''
  const lang = cls.startsWith('language-')
    ? cls.replace('language-', '')
    : undefined
  const codeBlockId = `codeblock-${hashObject(child)}`

  cls += ' ' + codeBlockId

  return (
    <div {...props}>
      {/* Language info */}
      <div className="text-on-surface-variant bg-surface-container-low mb-0.5 rounded-t-lg rounded-b-sm">
        <div className="flex items-center">
          <div className="mr-auto ml-0 flex py-2 pl-4">
            <IconCode className="text-secondary"></IconCode>
            <div className="flex items-start gap-2">
              <div className="text-secondary pl-2 text-lg font-bold">
                {tr.copyButton.title(lang)}
              </div>
              {lang !== undefined && lang.length > 1 && (
                <div className="bg-tertiary-container/60 text-on-tertiary-container/60 rounded px-1 py-0.5 text-xs">
                  {lang}
                </div>
              )}
            </div>
          </div>
          <CopyButton codeBlockId={codeBlockId} />
        </div>
      </div>
      {/* Code */}
      <div className="bg-surface-container-low gap-2 overflow-x-scroll rounded-t-sm rounded-b-lg p-4 font-mono">
        {React.cloneElement(child, {
          // @ts-expect-error Safe to assign class name here.
          className: cls,
        })}
      </div>
    </div>
  )
}
