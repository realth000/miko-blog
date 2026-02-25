import type { ReactNode } from 'react'

export default function Article({ children }: { children?: ReactNode }) {
  return (
    <main className="max-w-max-width-content mx-auto flex-1">{children}</main>
  )
}
