import { useEffect, useState } from 'react'

export default function useIsBrowser() {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return isBrowser
}
