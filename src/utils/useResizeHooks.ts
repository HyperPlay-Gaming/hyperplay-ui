import debounce from 'lodash/debounce'

// modify below value to modify isResizing within the parent
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface ResizingHooks {
  onResizeStart: () => void
  onResizeEnd: () => void
}

const setIsResizing = ({ onResizeStart, onResizeEnd }: ResizingHooks) => {
  let sentResizeStart = false

  const debounced = debounce(() => {
    sentResizeStart = false
    onResizeEnd()
  }, 100)

  const handleResize = () => {
    if (!sentResizeStart) {
      sentResizeStart = true
      onResizeStart()
    }

    debounced()
  }

  window.addEventListener('resize', handleResize)

  return () => window.removeEventListener('resize', handleResize)
}

export default setIsResizing
