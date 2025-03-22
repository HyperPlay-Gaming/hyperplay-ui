import React from 'react'

import cn from 'classnames'

import { PlayIcon } from '@/assets/images'

import { useCarousel } from '../../../..'
import styles from './Item.module.scss'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  imageElement: React.ReactNode | null
  onClick: () => void
  showLoadBar?: boolean
  itemIndex: number
  // these are just used to take up a slot in the controller and do not have UI/aren't clickable
  isEmptyItem?: boolean
  isVideoSlide?: boolean
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
  ...props
}: ItemProps) => {
  const {
    getTimeUntilSlideFinished,
    totalSlideTime,
    slideTimeOverrideIndexToTimeMsMap,
    timeUntilSlideFinishedOverrideIndexToTimeMsMap,
    isVideoSlidePlaying,
    isVideoSlide,
    isLoading
  } = useCarousel()

  let loadBar = null
  if (showLoadBar && isActive) {
    let timeUntilSlideFinishedMs = getTimeUntilSlideFinished?.()
    if (
      Object.hasOwn(timeUntilSlideFinishedOverrideIndexToTimeMsMap, itemIndex)
    ) {
      timeUntilSlideFinishedMs =
        timeUntilSlideFinishedOverrideIndexToTimeMsMap[itemIndex].timeLeftInMs
    }
    let initialProgressPct = 0
    let animationDurationMs = 5000
    let thisItemSlideTotalTimeMs = totalSlideTime
    if (Object.hasOwn(slideTimeOverrideIndexToTimeMsMap, itemIndex)) {
      thisItemSlideTotalTimeMs = slideTimeOverrideIndexToTimeMsMap[itemIndex]
    }
    if (
      typeof timeUntilSlideFinishedMs === 'number' &&
      thisItemSlideTotalTimeMs
    ) {
      initialProgressPct =
        ((thisItemSlideTotalTimeMs - timeUntilSlideFinishedMs) /
          thisItemSlideTotalTimeMs) *
        100
      animationDurationMs = timeUntilSlideFinishedMs
    }

    loadBar = (
      <div
        className={cn(styles.loader, {
          [styles.videoPlaying]: isVideoSlidePlaying[itemIndex] || !isVideoSlide
        })}
        // this is necessary to reset the animation timeline for the loader
        key={`slide-${itemIndex}-progress-pct-${initialProgressPct}-anim-duration-${animationDurationMs}`}
        style={{
          // @ts-expect-error ts does not like css vars
          '--carousel-item-initial-progress': `${initialProgressPct}%`,
          '--carousel-item-animation-duration': `${animationDurationMs}ms`
        }}
        data-testid={`carousel-controller-item-loader-${itemIndex}`}
      />
    )
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
          [styles.active]: isActive,
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
