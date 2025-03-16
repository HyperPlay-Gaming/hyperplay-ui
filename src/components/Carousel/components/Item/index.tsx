import React from 'react'

import cn from 'classnames'

import { useCarousel } from '../..'
import styles from './Item.module.scss'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  imageElement: JSX.Element
  onClick: () => void
  showGradientBorder?: boolean
  showLoadBar?: boolean
  itemIndex: number
}

const Item = ({
  isActive,
  imageElement,
  onClick,
  showGradientBorder = true,
  showLoadBar,
  itemIndex,
  className,
  ...props
}: ItemProps) => {
  const {
    getTimeUntilSlideFinished,
    totalSlideTime,
    slideTimeOverrideIndexToTimeMsMap,
    timeUntilSlideFinishedOverrideIndexToTimeMsMap
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
        timeUntilSlideFinishedOverrideIndexToTimeMsMap[itemIndex]
    }
    let initialProgressPct = 0
    let animationDurationMs = 5000
    let thisItemSlideTotalTimeMs = totalSlideTime
    console.log(
      'slideTimeOverrideIndexToTimeMsMap ',
      slideTimeOverrideIndexToTimeMsMap,
      ' item index ',
      itemIndex
    )
    if (Object.hasOwn(slideTimeOverrideIndexToTimeMsMap, itemIndex)) {
      thisItemSlideTotalTimeMs = slideTimeOverrideIndexToTimeMsMap[itemIndex]
    }
    if (
      typeof timeUntilSlideFinishedMs === 'number' &&
      thisItemSlideTotalTimeMs
    ) {
      initialProgressPct = Math.round(
        ((thisItemSlideTotalTimeMs - timeUntilSlideFinishedMs) /
          thisItemSlideTotalTimeMs) *
          100
      )
      animationDurationMs = timeUntilSlideFinishedMs

      console.log(
        'initialProgressPct ',
        initialProgressPct,
        ' animationDurationMs ',
        animationDurationMs,
        ' timeUntilSlideFinishedMs ',
        timeUntilSlideFinishedMs
      )
    }
    loadBar = (
      <div
        className={styles.loader}
        style={{
          // @ts-expect-error ts does not like css vars
          '--carousel-item-initial-progress': `${initialProgressPct}%`,
          '--carousel-item-animation-duration': `${animationDurationMs}ms`
        }}
      />
    )
  }
  return (
    <div
      className={cn(
        styles.itemContainer,
        {
          [styles.active]: isActive,
          [styles.noGradientBorder]: !showGradientBorder
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {border}
      <div className={styles.imageContainer}>{imageElement}</div>
      {loadBar}
    </div>
  )
}

export default Item
