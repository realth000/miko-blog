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
      <div className="pt-nav-bar-safe-area-height max-w-max-width-page mx-auto flex w-full gap-6 px-2">
        {children}
      </div>
      <Footer />
    </>
  )
}
