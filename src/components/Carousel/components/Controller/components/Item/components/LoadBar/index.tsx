import React, { useEffect, useState } from 'react'

import cn from 'classnames'

import { useCarousel } from '../../../../../..'
import styles from './index.module.scss'

export interface LoadBarProps extends React.HTMLAttributes<HTMLDivElement> {
  itemIndex: number
}

export function LoadBar({ itemIndex, className, ...props }: LoadBarProps) {
  const {
    getTimeUntilSlideFinished,
    totalSlideTime,
    slideTimeOverrideIndexToTimeMsMap,
    timeUntilSlideFinishedOverrideIndexToTimeMsMap,
    isVideoSlidePlaying,
    isVideoSlide,
    activeIndex,
    emblaApi
  } = useCarousel()
  /**
   * @dev This covers the edge case where the user leaves the tab and returns.
   * emblaApi observes this and resets the autoplay duration when the tab regains focus.
   * By listening to autoplay:timerset and re-rendering this component when it fires,
   * we can be sure that we are keeping the animation time of the loader bar accurate.
   */
  const [itemKeyIndex, setItemKeyIndex] = useState(0)
  useEffect(() => {
    const timerSetListener = () => {
      setItemKeyIndex(itemKeyIndex + 1)
    }
    if (activeIndex === itemIndex) {
      emblaApi?.on('autoplay:timerset', timerSetListener)
    }
    return () => {
      emblaApi?.off('autoplay:timerset', timerSetListener)
    }
  }, [emblaApi, activeIndex, itemKeyIndex])

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

  return (
    <div
      className={cn(
        styles.loader,
        {
          [styles.videoPlaying]: isVideoSlidePlaying[itemIndex] || !isVideoSlide
        },
        className
      )}
      // this is necessary to reset the animation timeline for the loader
      key={`slide-${itemIndex}-progress-pct-${initialProgressPct}-anim-duration-${animationDurationMs}-key-${itemKeyIndex}`}
      style={{
        // @ts-expect-error ts does not like css vars
        '--carousel-item-initial-progress': `${initialProgressPct}%`,
        '--carousel-item-animation-duration': `${animationDurationMs}ms`
      }}
      data-testid={`carousel-controller-item-loader-${itemIndex}`}
      {...props}
    />
  )
}
