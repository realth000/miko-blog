import {
  createContext, createElement, useContext, useEffect, useEffectEvent, useState
} from 'react'
import viteLogo from '/vite.svg'
import { purifyUrl } from './utils/encoding.ts'
import { findRoute, notFondPageTarget } from '@/router/router.ts'
import reactLogo from '@/assets/react.svg'

/**
 * The global route context.
 */
const RouteContext = createContext('')

export default function App() {
  const [currentPage, setCurrentPage] = useState('/')

  const renderPage = () => {
    console.log(`>>> renderPage: ${currentPage}, ${JSON.stringify(findRoute(currentPage))}`)
    return createElement((findRoute(currentPage) ?? notFondPageTarget).component)
  }

  /**
   * The callback handler when hash section in the current url changed.
   *
   * Use this function to handle routing.
   */
  const onHashChanged = useEffectEvent(() => {
    const path = purifyUrl(globalThis.location.hash.slice(1)) || '/'
    console.log(`>>> onHashChanged, path is >${path}<`)
    setCurrentPage(path)
  })

  useEffect(() => {
    globalThis.addEventListener('hashchange', onHashChanged)

    return () => {
      globalThis.removeEventListener('hashchange', onHashChanged)
    }
  }, [])

  return (
    <RouteContext value='/'>
      { renderPage() }
    </RouteContext>
  )
}

// OnHashChanged()

// renderPage(currentPage)

