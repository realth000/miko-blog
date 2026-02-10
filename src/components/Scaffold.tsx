import Footer from '@/components/Footer.tsx'
import NavBar from '@/components/NavBar.tsx'
import type { ReactNode } from 'react'

export default function Scaffold({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <NavBar/>
      <div className='miko-body'>
        {children}
      </div>
      <Footer/>
    </>
  )
}
