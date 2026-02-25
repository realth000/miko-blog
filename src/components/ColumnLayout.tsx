import type { ReactNode } from 'react'

export function ColumnLayout({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <>
      <div
        className={`max-w-max-width-content mx-auto flex w-full flex-col ${className}`}
      >
        {children}
      </div>
    </>
  )
}
