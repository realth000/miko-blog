import { IconChevronDown } from '@tabler/icons-react'
import { useState, type ReactNode } from 'react'

export default function Expandable({
  summary,
  collapse,
  children,
  ...props
}: {
  summary: string | undefined
  collapse: boolean
  children: ReactNode
  [key: string]: unknown
}) {
  const outer = summary

  const [collapsed, setCollapsed] = useState(collapse)
  const [flashRefreshKey, setFlashCount] = useState(true)

  return (
    <div {...props}>
      <div
        className={`text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high my-article-paragraph rounded-t-xl py-2 pl-4 ${collapsed ? 'my-article-paragraph rounded-b-xl' : 'mb-0.5 rounded-b-sm'}`}
        onClick={() => {
          setCollapsed(!collapsed)
          setFlashCount((prev) => !prev)
        }}
      >
        <div className="mr-auto ml-0 flex items-start gap-2">
          <IconChevronDown
            className={`text-secondary transform transition-transform ${collapsed ? '' : 'rotate-180'}`}
          />
          <div className="text-secondary text-lg font-bold">折叠块</div>
          {outer && (
            <div className="bg-secondary-container text-secondary rounded px-1.5 py-0.5 text-sm">
              {outer}
            </div>
          )}
        </div>
      </div>
      {!collapsed && (
        <div
          key={flashRefreshKey.toString()}
          className="bg-surface-container min-h-0 animate-[pulse_0.4s_ease-in-out_2] overflow-hidden rounded-t-sm rounded-b-xl p-4"
        >
          {children}
        </div>
      )}
    </div>
  )
}
