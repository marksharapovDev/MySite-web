import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type SlideDirection = 'next' | 'prev'

const slideRoutes = ['/', '/cv', '/dev'] as const
const wheelThreshold = 24
const touchThreshold = 48
const transitionMs = 620
const edgeOffset = 8

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>
  }
}

function getSlideIndex(pathname: string) {
  return slideRoutes.findIndex((route) => route === pathname)
}

function isAtPageEdge(direction: SlideDirection) {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const viewportHeight = window.innerHeight
  const scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  )
  const isScrollable = scrollHeight > viewportHeight + edgeOffset

  if (!isScrollable) return true

  if (direction === 'next') {
    return scrollTop + viewportHeight >= scrollHeight - edgeOffset
  }

  return scrollTop <= edgeOffset
}

export function usePageSlideNavigation() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const pathnameRef = useRef(pathname)
  const isTransitioningRef = useRef(false)
  const touchStartYRef = useRef(0)

  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  const goToRoute = useCallback((targetPath: string, direction: SlideDirection) => {
    if (isTransitioningRef.current) return

    isTransitioningRef.current = true
    const root = document.documentElement
    const transitionClass = direction === 'next' ? 'page-slide-next' : 'page-slide-prev'
    const viewTransitionDocument = document as ViewTransitionDocument

    root.classList.add(transitionClass)

    const finish = () => {
      window.setTimeout(() => {
        root.classList.remove(transitionClass)
        isTransitioningRef.current = false
      }, 40)
    }

    if (viewTransitionDocument.startViewTransition) {
      const transition = viewTransitionDocument.startViewTransition(() => {
        navigate(targetPath)
      })

      transition.finished.finally(finish)
      return
    }

    navigate(targetPath)
    window.setTimeout(finish, transitionMs)
  }, [navigate])

  const tryNavigate = useCallback((direction: SlideDirection) => {
    const index = getSlideIndex(pathnameRef.current)
    if (index < 0) return false

    const targetIndex = direction === 'next' ? index + 1 : index - 1
    const targetPath = slideRoutes[targetIndex]
    if (!targetPath) return false
    if (!isAtPageEdge(direction)) return false

    goToRoute(targetPath, direction)
    return true
  }, [goToRoute])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < wheelThreshold) return
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

      const direction: SlideDirection = event.deltaY > 0 ? 'next' : 'prev'
      if (!tryNavigate(direction)) return

      event.preventDefault()
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaY = touchStartYRef.current - touch.clientY
      if (Math.abs(deltaY) < touchThreshold) return

      const direction: SlideDirection = deltaY > 0 ? 'next' : 'prev'
      tryNavigate(direction)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [tryNavigate])
}
