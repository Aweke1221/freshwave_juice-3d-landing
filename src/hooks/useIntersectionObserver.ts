import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  triggerOnce = false,
}: UseIntersectionObserverProps = {}) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<Element>()

  const frozen = entry?.isIntersecting && triggerOnce

  useEffect(() => {
    const node = elementRef.current
    if (!node || frozen) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, frozen])

  return { elementRef, entry, isIntersecting }
}