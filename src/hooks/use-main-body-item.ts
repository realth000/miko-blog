import { useEffect, useRef, useState } from 'react'

/**
 * Observe current item displayed as main body of the screen.
 *
 * When a node reaches the bottom-top part of the screen, it becomes the body item.
 *
 * Note that all items need to observe as body should have id.
 *
 * @param ids All id of items that need to be observed.
 * @returns Id of current main body item.
 */
export default function useMainBodyItem(ids: string[]): string | undefined {
  const [currId, setCurrId] = useState<string | undefined>()
  const observer = useRef<IntersectionObserver | undefined>(undefined)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    )

    for (const id of ids) {
      const element = document.querySelector(`#${id}`)
      if (element !== null) {
        observer.current.observe(element)
      }
    }

    return () => observer.current?.disconnect()
  }, [ids])

  return currId
}
