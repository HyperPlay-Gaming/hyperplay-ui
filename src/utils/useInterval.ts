/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef } from 'react'

interface IntervalControls {
  pauseInterval: () => void
  continueInterval: () => void
  resetInterval: (newDelay?: number | null) => void
}

const useInterval = (
  callback: () => void,
  delay?: number | null
): IntervalControls => {
  const savedCallback = useRef<() => void>(() => {})
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined)
  const isPaused = useRef<boolean>(false)
  const currentDelay = useRef<number | null>(delay || 0)

  const pauseInterval = () => {
    if (intervalId.current !== undefined && !isPaused.current) {
      clearInterval(intervalId.current)
      isPaused.current = true
    }
  }

  const continueInterval = () => {
    if (intervalId.current !== undefined && isPaused.current) {
      intervalId.current = setInterval(
        () => savedCallback.current(),
        currentDelay.current || 0
      )
      isPaused.current = false
    }
  }

  const resetInterval = (newDelay?: number | null) => {
    if (newDelay !== undefined && newDelay !== null) {
      currentDelay.current = newDelay
    }

    if (intervalId.current !== undefined && isPaused.current) {
      intervalId.current = setInterval(
        () => savedCallback.current(),
        currentDelay.current || 0
      )
      isPaused.current = false
    }
  }

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      intervalId.current = setInterval(
        () => savedCallback.current(),
        delay || 0
      )
      currentDelay.current = delay || null
      isPaused.current = false
    }

    return () => clearInterval(intervalId.current)
  }, [delay])

  return { pauseInterval, continueInterval, resetInterval }
}

export default useInterval

// import { useEffect, useRef } from 'react'

// const useInterval = (callback: () => void, delay?: number | null) => {
//   const savedCallback = useRef<() => void>(() => {})
//   const interval = useRef<number | undefined>(undefined)

//   useEffect(() => {
//     savedCallback.current = callback
//   })

//   useEffect(() => {
//     if (delay !== null) {
//       interval.current = setInterval(() => savedCallback.current(), delay || 0)
//       return () => clearInterval(interval.current)
//     }

//     return undefined
//   }, [delay])

//   return () => {
//     clearInterval(interval.current)
//     interval.current = setInterval(() => savedCallback.current(), delay || 0)
//   }
// }

// export default useInterval
