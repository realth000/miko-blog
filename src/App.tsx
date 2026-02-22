import {
  createElement,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react'
import { findRoute, notFondPageTarget } from '@/router/router'
import { log } from './log'
import { purifyUrl } from './utils/encoding'

/**
 *
 * Split full hash '/foo/bar#baz' into:
 *
 * * hash: '/foo/bar/'
 * * anchor: 'baz'
 */
function splitHashAndAnchor(data: string): {
  hash: string
  anchor: string | undefined
} {
  const s = data.indexOf('#')
  return s == -1
    ? { hash: data, anchor: undefined }
    : { hash: data.slice(0, s), anchor: data.slice(s + 1) }
}

export default function App() {
  /**
   * The hash here is the part of hash for routing.
   */
  const [currHash, setCurrHash] = useState<string | undefined>()

  /**
   * Last anchor in url.
   */
  const [currAnchor, setCurrAnchor] = useState<string | undefined>()

  /**
   * Concated hash and anchor forms the entire url hash.
   */
  const prevHashAndAnchor = useRef('')

  const renderPage = () => {
    const path = globalThis.location.pathname
    const { hash, anchor } = splitHashAndAnchor(
      globalThis.location.hash.slice(1) || '/',
    )
    const targetRoute = currHash ?? hash
    if (currAnchor !== anchor) {
      setCurrAnchor(anchor)
    }

    log(
      `renderPage: currnetPage=${currHash ?? '<undefined>'}, path=${path}, hash=${hash}, anchor=${anchor ?? '<undefined>'}`,
    )
    return createElement(
      (findRoute(targetRoute) ?? notFondPageTarget).component,
    )
  }

  const onScrollToElementRequired = useEffectEvent((hash: string) => {
    // Only scroll into view by id
    //
    // When user clicked links with href `#foo` then scroll to foo,
    // where foo is already in the page, just do the scrolling.

    let newHash: string
    if (prevHashAndAnchor.current.length === 0) {
      // No current anchor indicates user is accessing with direct url to some page.
      const { hash: currHash } = splitHashAndAnchor(
        globalThis.location.hash.slice(1) || '/',
      )
      newHash = `${currHash}#${hash}`
    } else {
      const prevHashAnchorIndex = prevHashAndAnchor.current.indexOf('#')
      newHash =
        prevHashAnchorIndex === -1
          ? `${prevHashAndAnchor.current}#${hash}`
          : `${prevHashAndAnchor.current.slice(0, prevHashAnchorIndex)}#${hash}`
    }

    log(
      'replace state with',
      `/#${newHash}`,
      'prevHashAndAnchor',
      prevHashAndAnchor,
    )
    globalThis.history.replaceState({}, '', `/#${newHash}`)

    const elementId = '#' + hash
    const targetElement = document.querySelector(elementId)
    if (!targetElement) {
      log(
        `failed to scroll to element with hash id ${elementId}: element not found`,
      )
      return
    }

    targetElement.scrollIntoView()
    prevHashAndAnchor.current = newHash
  })

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
      setCurrHash(hash)
      prevHashAndAnchor.current = hash
    } else {
      // Scroll in current page, to a specified element.
      onScrollToElementRequired(hash)
    }
  })

  /**
   * Handle url hash changes.
   *
   * Here the hash is raw hash in url, including hash (for routing) and anchor (for deep linking).
   */
  useEffect(() => {
    globalThis.addEventListener('hashchange', onHashChanged)

    return () => {
      globalThis.removeEventListener('hashchange', onHashChanged)
    }
  }, [])

  /**
   * Handle anchor changes.
   *
   * Anchor changed means need to scroll to current element.
   */
  useEffect(() => {
    if (currAnchor) {
      onScrollToElementRequired(currAnchor)
    }
  }, [currAnchor])

  return <>{renderPage()}</>
}
