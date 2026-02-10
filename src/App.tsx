import {
  createContext, createElement, useEffect, useEffectEvent, useState
} from 'react'
import { findRoute, notFondPageTarget } from '@/router/router.ts'
import { purifyUrl } from './utils/encoding.ts'


/**
 * The global route context.
 */
const RouteContext = createContext('')

export default function App() {
  const [currentPage, setCurrentPage] = useState('/')

  const renderPage = () => {
    return createElement((findRoute(currentPage) ?? notFondPageTarget).component)
  }

  /**
   * The callback handler when hash section in the current url changed.
   *
   * Use this function to handle routing.
   */
  const onHashChanged = useEffectEvent(() => {
    const path = purifyUrl(globalThis.location.hash.slice(1)) || '/'
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
      {renderPage()}
    </RouteContext>
  )
}

// OnHashChanged()

// renderPage(currentPage)

