'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { useMediaQuery } from '@mantine/hooks'
import cn from 'classnames'

import { useCarousel } from '../..'
import styles from './Controller.module.scss'
import BaseButton from './components/BaseButton'
import Item from './components/Item'
import { scrollHorizontalIntoViewWithOffset } from './helpers'

export interface ItemData {
  image: React.ReactElement
  isVideoSlide?: boolean
}

export interface ControllerProps extends React.HTMLAttributes<HTMLDivElement> {
  itemsData: ItemData[]
  numItemsToShow?: number
  showItemLoadBar?: boolean
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
  itemsData,
  className,
  numItemsToShow: numItemsToShowInit = 5,
  showItemLoadBar = true,
  classNames,
  ...props
}: ControllerProps) => {
  const { activeIndex, setActiveIndex, isLoading, stop } = useCarousel()
  const [itemsPageIndex, setItemsPageIndex] = useState(0)
  const [numItemsToShow, setNumItemsToShow] = useState(numItemsToShowInit)
  const isMobile = useMediaQuery('(max-width: 599px)', false, {
    getInitialValueInEffect: true
  })
  useEffect(() => {
    if (isMobile) {
      setNumItemsToShow(itemsData.length)
    } else {
      setNumItemsToShow(numItemsToShowInit)
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      scrollHorizontalIntoViewWithOffset(
        'carousel-controller-root-container',
        `carousel-controller-item-id-${activeIndex}`,
        16
      )
    }
  }, [isMobile, activeIndex])

  const maxPageIndex = Math.floor((itemsData.length - 1) / numItemsToShow)
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
      setActiveIndex(index)
      stop()
    },
    [stop, setActiveIndex]
  )

  // every time active index changes, scroll that controller item page into view
  useEffect(() => {
    const itemPageWithActiveIndex = Math.floor(activeIndex / numItemsToShow)
    setItemsPageIndex(itemPageWithActiveIndex)
  }, [activeIndex])

  const startIndex = Math.max(itemsPageIndex * numItemsToShow, 0)
  const endIndex = (itemsPageIndex + 1) * numItemsToShow
  const disablePageButtons = maxPageIndex === 0 || isLoading

  const itemsToShow: React.ReactNode[] = []
  for (let itemIndex = startIndex; itemIndex < endIndex; ++itemIndex) {
    if (itemIndex < itemsData.length) {
      const Image = itemsData[itemIndex].image
      itemsToShow.push(
        <Item
          key={`hyperplay_carousel_controller_${itemIndex}`}
          imageElement={Image}
          isActive={itemIndex === activeIndex}
          onClick={() => handleClick(itemIndex)}
          data-testid={`carousel-controller-item-${itemIndex}`}
          showLoadBar={showItemLoadBar}
          itemIndex={itemIndex}
          className={classNames?.item}
          isVideoSlide={itemsData[itemIndex].isVideoSlide}
          id={`carousel-controller-item-id-${itemIndex}`}
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
      id="carousel-controller-root-container"
      className={cn(
        styles.controllerDetached,
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
          disabled={disablePageButtons}
          classNames={{ root: styles.itemsPageButton }}
        />
        {itemsToShow}
        <BaseButton
          onClick={nextItemsPage}
          className={cn(classNames?.rightButton)}
          isLeftButton={false}
          disabled={disablePageButtons}
          classNames={{ root: styles.itemsPageButton }}
        />
      </div>
    </div>
  )
}

export default Controller
