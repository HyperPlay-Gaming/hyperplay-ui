import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import classNames from 'classnames'

import useInterval from '@/utils/useInterval'

import LeftButton from '../Controls/LeftButton'
import RightButton from '../Controls/RightButton'
import Item from '../Item'
import styles from './Controller.module.scss'

export interface ControllerRef {
  goTo: (index: number) => void
  pause: () => void
  continue: () => void
}

export interface ControllerProps {
  interval: number
  images: JSX.Element[]
  onChange?: (index: number) => void
  hidden?: boolean
}

const Controller = forwardRef<ControllerRef, ControllerProps>(
  ({ images, interval, onChange, hidden }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [displayNone, setDisplayNone] = useState(false)

    useEffect(() => {
      if (hidden) {
        setTimeout(() => hidden && setDisplayNone(true), 300)
      } else {
        setDisplayNone(false)
      }
    }, [hidden])

    const nextImage = () => {
      if (hidden) return

      const newIndex = (activeIndex + 1) % images.length

      onChange?.(newIndex)
      setActiveIndex(newIndex)
    }

    const previousImage = () => {
      if (hidden) return

      const newIndex = (activeIndex - 1 + images.length) % images.length

      onChange?.(newIndex)
      setActiveIndex(newIndex)
    }

    const { pauseInterval, continueInterval, resetInterval } = useInterval(
      nextImage,
      interval
    )

    const handleClick = (index: number) => {
      if (hidden) return

      resetInterval()
      onChange?.(index)
      setActiveIndex(index)
    }

    const startIndex = Math.max(activeIndex - 3, 0)
    const endIndex = Math.min(startIndex + 4, images.length)

    useImperativeHandle(ref, () => ({
      goTo: (index: number) => {
        setActiveIndex(index)
      },
      pause: pauseInterval,
      continue: continueInterval
    }))

    return (
      <div
        className={classNames(styles.root, {
          [styles.hidden]: hidden,
          [styles.displayNone]: displayNone
        })}
      >
        <LeftButton onClick={previousImage} />
        {images.slice(startIndex, endIndex).map((Image, index) => (
          <Item
            key={startIndex + index}
            imageElement={Image}
            isActive={startIndex + index === activeIndex}
            onClick={() => handleClick(startIndex + index)}
          />
        ))}
        <RightButton onClick={nextImage} />
      </div>
    )
  }
)

Controller.displayName = 'Controller'

export default Controller
