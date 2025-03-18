import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import { Carousel } from '@mantine/carousel'

import { useCarousel } from '../..'

export interface SlideVideoInterface {
  slideProps?: React.ComponentProps<typeof Carousel.Slide> & {
    'data-testid': string
  }
  reactPlayerProps?: React.ComponentProps<typeof ReactPlayer>
  indexInSlides?: number
  onEnd?: () => void
}

export function SlideVideo({
  slideProps,
  reactPlayerProps,
  indexInSlides,
  onEnd
}: SlideVideoInterface) {
  const {
    play,
    stop,
    activeIndex,
    scrollNextSlide,
    setSlideTimeOverride,
    setTimeUntilSlideFinishedOverride
  } = useCarousel()
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoDurationInMs, setVideoDurationInMs] = useState(5000)

  // this prevents the item's loader bar from using the default autoplay delay before onProgress fires on ReactPlayer
  useEffect(() => {
    if (indexInSlides !== undefined) {
      setTimeUntilSlideFinishedOverride(indexInSlides, Number.MAX_SAFE_INTEGER)
    }
  }, [])

  const onPlay = useCallback(() => {
    setIsPlaying(true)
    stop()
  }, [stop])

  const onStop = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const onEnded = useCallback(() => {
    setIsPlaying(false)
    play()
    scrollNextSlide()
    onEnd?.()
  }, [play, scrollNextSlide, onEnd])

  /**
   * @dev start playing when this slide is active and disable carousel rotation
   */
  useEffect(() => {
    if (indexInSlides === activeIndex) {
      onPlay()
    }
  }, [activeIndex, indexInSlides])

  useEffect(() => {
    if (indexInSlides !== undefined) {
      setSlideTimeOverride(indexInSlides, videoDurationInMs)
    }
  }, [videoDurationInMs])

  return (
    <Carousel.Slide {...slideProps}>
      <ReactPlayer
        onDuration={(duration: number) =>
          setVideoDurationInMs(Math.round(duration * 1000))
        }
        onProgress={(state) => {
          if (indexInSlides !== undefined) {
            setTimeUntilSlideFinishedOverride(
              indexInSlides,
              Math.round(videoDurationInMs - state.playedSeconds * 1000)
            )
          }
        }}
        width={'100%'}
        height={'100%'}
        onPlay={onPlay}
        onPause={onStop}
        onEnded={onEnded}
        playing={isPlaying}
        onClickPreview={() => console.log('preview clicked')}
        controls={true}
        muted={true}
        {...reactPlayerProps}
      />
    </Carousel.Slide>
  )
}
