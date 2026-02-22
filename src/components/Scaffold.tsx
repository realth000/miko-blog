import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import type { ReactNode } from 'react'

export default function Scaffold({
  children,
}: {
  readonly children: ReactNode
}) {
  return (
    <>
      <NavBar />
      <div className="max-auto flex max-w-(--max-width-page) gap-6 px-2 pt-(--nav-bar-safe-area-height)">
        {children}
      </div>
      <Footer />
    </>
  )
}
