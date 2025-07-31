import React from 'react'

import cn from 'classnames'

import { PlayIcon } from '@/assets/images'

import { useCarousel } from '../../../..'
import styles from './Item.module.scss'
import { LoadBar } from './components/LoadBar'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  imageElement: React.ReactNode | null
  onClick: () => void
  showLoadBar?: boolean
  itemIndex: number
  // these are just used to take up a slot in the controller and do not have UI/aren't clickable
  isEmptyItem?: boolean
  isVideoSlide?: boolean
  isAttached?: boolean
}

const Item = ({
  isActive,
  imageElement,
  onClick,
  showLoadBar,
  itemIndex,
  className,
  isEmptyItem,
  isVideoSlide: isVideoSlideProp,
  isAttached = false,
  ...props
}: ItemProps) => {
  const { isLoading } = useCarousel()

  let loadBar = null
  if (showLoadBar && isActive) {
    loadBar = <LoadBar itemIndex={itemIndex} className={styles.loader} />
  }
  let playIcon = null
  if (isVideoSlideProp) {
    playIcon = (
      <div className={styles.playIconContainer}>
        <PlayIcon />
      </div>
    )
  }
  let content: React.ReactNode | null = (
    <>
      <div className={styles.imageContainer}>{imageElement}</div>
      {playIcon}
      {loadBar}
    </>
  )
  if (isEmptyItem || isLoading) {
    content = null
  }
  let buttonOnClick: (() => void) | undefined = onClick
  if (isLoading) {
    buttonOnClick = undefined
  }
  return (
    <div
      className={cn(
        styles.itemContainer,
        styles.noGradientBorder,
        {
          [styles.attached]: isAttached
        },
        {
          [styles.active]: isActive && !isAttached,
          [styles.empty]: isEmptyItem,
          [styles.loading]: isLoading
        },
        className
      )}
      onClick={buttonOnClick}
      {...props}
    >
      {content}
    </div>
  )
}

export default Item
