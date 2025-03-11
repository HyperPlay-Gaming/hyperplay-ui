import React from 'react'

import classNames from 'classnames'

import LeftButton from '../Controls/LeftButton'
import RightButton from '../Controls/RightButton'
import Item from '../Item'
import styles from './Controller.module.scss'

export interface ControllerProps {
  activeIndex: number
  images: JSX.Element[]
  onChange?: (index: number) => void
}

const Controller = ({ images, onChange, activeIndex }: ControllerProps) => {
  const nextImage = () => {
    const newIndex = (activeIndex + 1) % images.length
    onChange?.(newIndex)
  }

  const previousImage = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length
    onChange?.(newIndex)
  }

  const handleClick = (index: number) => {
    onChange?.(index)
  }

  const startIndex = Math.max(activeIndex - 3, 0)
  const endIndex = Math.min(startIndex + 4, images.length)

  return (
    <div className={classNames(styles.root)}>
      <LeftButton onClick={previousImage} />
      {images.slice(startIndex, endIndex).map((Image, index) => (
        <Item
          key={`hyperplay_carousel_controller_${startIndex + index}`}
          imageElement={Image}
          isActive={startIndex + index === activeIndex}
          onClick={() => handleClick(startIndex + index)}
        />
      ))}
      <RightButton onClick={nextImage} />
    </div>
  )
}

export default Controller
