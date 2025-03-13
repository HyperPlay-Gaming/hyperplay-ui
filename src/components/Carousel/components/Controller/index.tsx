import React from 'react'

import cn from 'classnames'

import { useCarousel } from '../..'
import LeftButton from '../Controls/LeftButton'
import RightButton from '../Controls/RightButton'
import Item from '../Item'
import styles from './Controller.module.scss'

export interface ControllerProps extends React.HTMLAttributes<HTMLDivElement> {
  images: React.ReactElement[]
  showGradientBorder?: boolean
  controllerLayout?: 'attached' | 'detached'
}

const Controller = ({
  images,
  showGradientBorder,
  controllerLayout = 'attached',
  className,
  ...props
}: ControllerProps) => {
  const { activeIndex, setActiveIndex } = useCarousel()
  const nextImage = () => {
    const newIndex = (activeIndex + 1) % images.length
    setActiveIndex(newIndex)
  }

  const previousImage = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length
    setActiveIndex(newIndex)
  }

  const handleClick = (index: number) => {
    setActiveIndex(index)
  }

  const startIndex = Math.max(activeIndex - 3, 0)
  const endIndex = Math.min(startIndex + 4, images.length)

  return (
    <div
      className={cn(
        controllerLayout === 'attached'
          ? styles.controllerAttached
          : styles.controllerDetached,
        className
      )}
      {...props}
    >
      <div className={cn(styles.root)}>
        <LeftButton onClick={previousImage} />
        {images.slice(startIndex, endIndex).map((Image, index) => (
          <Item
            key={`hyperplay_carousel_controller_${startIndex + index}`}
            imageElement={Image}
            isActive={startIndex + index === activeIndex}
            onClick={() => handleClick(startIndex + index)}
            showGradientBorder={showGradientBorder}
          />
        ))}
        <RightButton onClick={nextImage} />
      </div>
    </div>
  )
}

export default Controller
