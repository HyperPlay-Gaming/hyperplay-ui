/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay?: number | null) => {
  const savedCallback = useRef<() => void>(() => {})
  const interval = useRef<number | undefined>(undefined)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      interval.current = setInterval(() => savedCallback.current(), delay || 0)
      return () => clearInterval(interval.current)
    }

    return undefined
  }, [delay])

  return () => {
    clearInterval(interval.current)
    interval.current = setInterval(() => savedCallback.current(), delay || 0)
  }
}

export default useInterval
