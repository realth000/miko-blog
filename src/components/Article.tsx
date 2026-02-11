import type { ReactNode } from 'react'

export default function Article({ children }: { children?: ReactNode }) {
  return (
    <main className='miko-article'>
      {children}
    </main>
  )
}
