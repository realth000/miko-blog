import {
  createContext, createElement, useEffect, useEffectEvent, useRef, useState,
} from 'react'
import { findRoute, notFondPageTarget } from '@/router/router.ts'
import { log } from './log.ts'
import { purifyUrl } from './utils/encoding.ts'


/**
 * The global route context.
 */
const RouteContext = createContext('')

export default function App() {
  const [currentPage, setCurrentPage] = useState('/')
  const prevHash = useRef('')

  const renderPage = () => {
    const path = globalThis.location.pathname
    const hash = globalThis.location.hash.slice(1) || '/'
    log(`renderPage: path=${path}, hash=${hash}`)
    return createElement((findRoute(currentPage) ?? notFondPageTarget).component)
  }


  /**
   * The callback handler when hash section in the current url changed.
   *
   * Use this function to handle routing.
   */
  const onHashChanged = useEffectEvent(() => {
    const hash = purifyUrl(globalThis.location.hash.slice(1)) || '/'
    if (hash.startsWith('/')) {
      // Change hash route.
      //
      // Double hash sign in `hash` is possible:
      //
      // /#/foo/bar#baz
      //
      // where /foo/bar is the route and baz is the anchor to scroll.
      // The scrolling is triggered after `currentPage` is updated.
      setCurrentPage(hash)
      prevHash.current = hash
    } else {
      // Only scroll into view by id
      //
      // This branch is possible as the user clicked links with href `#foo` to scroll to foo
      // where foo is already in the page, just do the scrolling.

      const prevHashAnchorIndex = prevHash.current.indexOf('#')
      const newHash = prevHashAnchorIndex === -1 ? `${prevHash.current}#${hash}` : `${prevHash.current.slice(0, prevHashAnchorIndex)}#${hash}`
      globalThis.history.replaceState({}, '', `/#${newHash}`)

      const elementId = '#' + hash
      const targetElement = document.querySelector(elementId)
      if (!targetElement) {
        log(`failed to scroll to element with hash id ${elementId}: element not found`)
        return
      }

      targetElement.scrollIntoView()
      prevHash.current = newHash
    }
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

