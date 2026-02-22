import type { ReactNode } from 'react'

export default function Article({ children }: { children?: ReactNode }) {
  return (
    <main className="mx-auto max-w-(--max-width-content) flex-1">
      {children}
    </main>
  )
}
