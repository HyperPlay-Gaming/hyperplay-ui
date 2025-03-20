import React from 'react'

import cn from 'classnames'

import { useCarousel } from '../../../..'
import styles from './Item.module.scss'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  imageElement: React.ReactNode | null
  onClick: () => void
  showGradientBorder?: boolean
  showLoadBar?: boolean
  itemIndex: number
  // these are just used to take up a slot in the controller and do not have UI/aren't clickable
  isEmptyItem?: boolean
}

const Item = ({
  isActive,
  imageElement,
  onClick,
  showGradientBorder = true,
  showLoadBar,
  itemIndex,
  className,
  isEmptyItem,
  ...props
}: ItemProps) => {
  const {
    getTimeUntilSlideFinished,
    totalSlideTime,
    slideTimeOverrideIndexToTimeMsMap,
    timeUntilSlideFinishedOverrideIndexToTimeMsMap,
    isVideoPlaying,
    isVideoSlide
  } = useCarousel()

  let border = null
  if (showGradientBorder) {
    border = <div className={styles.border} />
  }
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
          [styles.videoPlaying]: isVideoPlaying || !isVideoSlide
        })}
        // this is necessary to reset the animation timeline for the loader
        key={`slide-${itemIndex}-progress-pct-${initialProgressPct}-anim-duration-${animationDurationMs}`}
        style={{
          // @ts-expect-error ts does not like css vars
          '--carousel-item-initial-progress': `${initialProgressPct}%`,
          '--carousel-item-animation-duration': `${animationDurationMs}ms`
        }}
      />
    )
  }
  let content: React.ReactNode | null = (
    <>
      {border}
      <div className={styles.imageContainer}>{imageElement}</div>
      {loadBar}
    </>
  )
  if (isEmptyItem) {
    content = null
  }
  return (
    <div
      className={cn(
        styles.itemContainer,
        {
          [styles.active]: isActive,
          [styles.noGradientBorder]: !showGradientBorder,
          [styles.empty]: isEmptyItem
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {content}
    </div>
  )
}

export default Item
