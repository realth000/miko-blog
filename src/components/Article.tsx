import type { ReactNode } from 'react'

export default function Article({
  children,
  enableMxAuto = true,
}: {
  children?: ReactNode
  enableMxAuto?: boolean
}) {
  return (
    <main
      className={`max-w-max-width-content flex-1 ${enableMxAuto ? 'mx-auto' : ''}`}
    >
      {children}
    </main>
  )
}
