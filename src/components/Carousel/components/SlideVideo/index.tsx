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
    activeIndex,
    onVideoPlay,
    onVideoPaused,
    onVideoEnded,
    setTimeUntilSlideFinishedOverride,
    isVideoPlaying,
    setSlideTimeOverride
  } = useCarousel()
  const [videoDurationInMs, setVideoDurationInMs] = useState(5000)

  // this prevents the item's loader bar from using the default autoplay delay before onProgress fires on ReactPlayer
  useEffect(() => {
    if (indexInSlides !== undefined) {
      setTimeUntilSlideFinishedOverride(indexInSlides, Number.MAX_SAFE_INTEGER)
    }
  }, [])

  const onVideoEndedHandler = useCallback(() => {
    onVideoEnded()
    onEnd?.()
  }, [onVideoEnded, onEnd])

  /**
   * @dev start playing when this slide is active and disable carousel rotation
   */
  useEffect(() => {
    if (indexInSlides === activeIndex) {
      onVideoPlay()
    }
  }, [activeIndex, indexInSlides])

  useEffect(() => {
    if (indexInSlides !== undefined) {
      setSlideTimeOverride(indexInSlides, videoDurationInMs)
    }
  }, [videoDurationInMs])

  return (
    <Carousel.Slide
      data-testid={`video-slide-${indexInSlides}`}
      {...slideProps}
    >
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
        onPlay={onVideoPlay}
        onPause={onVideoPaused}
        onEnded={onVideoEndedHandler}
        playing={isVideoPlaying}
        onClickPreview={() => console.log('preview clicked')}
        controls={true}
        muted={true}
        onError={(...args) =>
          console.error(`Error while loading video: ${JSON.stringify(args)}`)
        }
        {...reactPlayerProps}
      />
    </Carousel.Slide>
  )
}
