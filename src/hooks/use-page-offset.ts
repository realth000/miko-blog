import { useEffect, useState } from 'react'

/**
 * Get current page scroll offset.
 *
 * - When at the top of page, value is 0.
 * - When at the bottom of the page, value is 100.
 *
 * @returns Current page position offset, 0 <= value <= 100.
 */
export default function usePageOffset(): number {
  const [offset, setOffset] = useState<number>(0)

  useEffect(() => {
    let ticking = false
    let timerId: number | undefined
    function onScroll() {
      if (!ticking) {
        ticking = true
        timerId = globalThis.setTimeout(() => {
          ticking = false
          const scrollOffset = window.scrollY
          const pageHeight = document.documentElement.scrollHeight
          const viewportHeight = window.innerHeight
          if (pageHeight <= viewportHeight) {
            setOffset(0)
          } else {
            setOffset((scrollOffset * 100) / (pageHeight - viewportHeight))
          }
        }, 300)
      }
    }

    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
      clearTimeout(timerId)
    }
  }, [])

  return offset
}
