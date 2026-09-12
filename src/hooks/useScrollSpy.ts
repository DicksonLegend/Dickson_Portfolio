import { useState, useEffect } from 'react'

/**
 * Tracks which section ID is currently active in viewport.
 */
export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(id)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}
