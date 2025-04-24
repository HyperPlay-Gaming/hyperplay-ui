import { useEffect, useRef, useState, DependencyList } from 'react'

export const useShowTooltipOnOverflow = (dependencies: DependencyList = []) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const el = elementRef.current
    if (el) {
      const isOverflowing =
        el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight
      setShowTooltip(isOverflowing)
    }
  }, dependencies)

  return { elementRef, showTooltip }
}
