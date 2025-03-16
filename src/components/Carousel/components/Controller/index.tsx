import React from 'react'

import cn from 'classnames'

import { useCarousel } from '../..'
import styles from './Controller.module.scss'
import BaseButton, { CarouselButtonType } from './components/BaseButton'
import Item from './components/Item'

export interface ControllerProps extends React.HTMLAttributes<HTMLDivElement> {
  images: React.ReactElement[]
  showGradientBorder?: boolean
  controllerLayout?: 'attached' | 'detached'
  numItemsToShow?: number
  showItemLoadBar?: boolean
  carouselButtonType?: CarouselButtonType
  classNames?: {
    rootContainer?: string
    root?: string
    leftButton?: string
    leftButtonContainer?: string
    rightButton?: string
    rightButtonContainer?: string
    item?: string
  }
}

const Controller = ({
  images,
  showGradientBorder,
  controllerLayout = 'detached',
  className,
  numItemsToShow = 5,
  showItemLoadBar,
  classNames,
  carouselButtonType,
  ...props
}: ControllerProps) => {
  const { activeIndex, setActiveIndex, stop } = useCarousel()
  const nextImage = () => {
    stop()
    const newIndex = (activeIndex + 1) % images.length
    setActiveIndex(newIndex)
  }

  const previousImage = () => {
    stop()
    const newIndex = (activeIndex - 1 + images.length) % images.length
    setActiveIndex(newIndex)
  }

  const handleClick = (index: number) => {
    stop()
    setActiveIndex(index)
  }

  const startIndex = Math.max(activeIndex - numItemsToShow + 1, 0)
  const endIndex = Math.min(startIndex + numItemsToShow, images.length)

  return (
    <div
      className={cn(
        controllerLayout === 'attached'
          ? styles.controllerAttached
          : styles.controllerDetached,
        className,
        classNames?.rootContainer
      )}
      {...props}
    >
      <div className={cn(styles.root, classNames?.root)}>
        <BaseButton
          onClick={previousImage}
          className={classNames?.leftButton}
          isLeftButton={true}
          carouselButtonType={carouselButtonType}
        />
        {images.slice(startIndex, endIndex).map((Image, index) => {
          const itemIndex = startIndex + index
          return (
            <Item
              key={`hyperplay_carousel_controller_${itemIndex}`}
              imageElement={Image}
              isActive={itemIndex === activeIndex}
              onClick={() => handleClick(itemIndex)}
              showGradientBorder={showGradientBorder}
              data-testid={`carousel-controller-item-${itemIndex}`}
              showLoadBar={showItemLoadBar}
              itemIndex={itemIndex}
              className={classNames?.item}
            />
          )
        })}
        <BaseButton
          onClick={nextImage}
          className={classNames?.rightButton}
          isLeftButton={false}
          carouselButtonType={carouselButtonType}
        />
      </div>
    </div>
  )
}

export default Controller
