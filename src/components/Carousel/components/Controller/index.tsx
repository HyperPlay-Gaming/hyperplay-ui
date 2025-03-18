import React, { useCallback, useState } from 'react'

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
  const { activeIndex, setActiveIndex } = useCarousel()
  const [itemsPageIndex, setItemsPageIndex] = useState(0)
  const maxPageIndex = Math.floor((images.length - 1) / numItemsToShow)
  const nextItemsPage = useCallback(() => {
    let newPageIndex = itemsPageIndex + 1
    if (newPageIndex > maxPageIndex) {
      newPageIndex = 0
    }
    setItemsPageIndex(newPageIndex)
  }, [maxPageIndex, setItemsPageIndex, itemsPageIndex])

  const previousItemsPage = useCallback(() => {
    let newPageIndex = itemsPageIndex - 1
    if (newPageIndex < 0) {
      newPageIndex = maxPageIndex
    }
    setItemsPageIndex(newPageIndex)
  }, [maxPageIndex, setItemsPageIndex, itemsPageIndex])

  const handleClick = useCallback(
    (index: number) => {
      stop()
      setActiveIndex(index)
    },
    [stop, setActiveIndex]
  )

  const startIndex = Math.max(itemsPageIndex * numItemsToShow, 0)
  const endIndex = (itemsPageIndex + 1) * numItemsToShow
  const disablePageButtons = maxPageIndex === 0

  const itemsToShow: React.ReactNode[] = []
  for (let itemIndex = startIndex; itemIndex < endIndex; ++itemIndex) {
    if (itemIndex < images.length) {
      const Image = images[itemIndex]
      itemsToShow.push(
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
    } else {
      itemsToShow.push(
        <Item
          key={`hyperplay_carousel_controller_empty_${itemIndex}`}
          imageElement={null}
          isActive={false}
          onClick={() => console.warn('empty item clicked')}
          itemIndex={itemIndex}
          isEmptyItem={true}
        />
      )
    }
  }

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
          onClick={previousItemsPage}
          className={classNames?.leftButton}
          isLeftButton={true}
          carouselButtonType={carouselButtonType}
          disabled={disablePageButtons}
        />
        {itemsToShow}
        <BaseButton
          onClick={nextItemsPage}
          className={classNames?.rightButton}
          isLeftButton={false}
          carouselButtonType={carouselButtonType}
          disabled={disablePageButtons}
        />
      </div>
    </div>
  )
}

export default Controller
