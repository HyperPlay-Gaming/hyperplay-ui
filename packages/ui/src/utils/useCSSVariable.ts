import { useState, useEffect } from 'react'

const useCSSVariable = (variableName: string) => {
  const [value, setValue] = useState(() => {
    return window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim()
  })

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === 'style') {
          const currentValue = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim()

          if (currentValue !== value) {
            setValue(currentValue)
          }
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    })

    return () => {
      observer.disconnect()
    }
  }, [variableName])

  return value
}

export default useCSSVariable
