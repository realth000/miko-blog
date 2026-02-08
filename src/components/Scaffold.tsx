import type { ReactNode } from 'react'
import NavBar from '@/components/NavBar.tsx'
import Footer from '@/components/Footer.tsx'

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
