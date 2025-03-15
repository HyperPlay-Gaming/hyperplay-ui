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
}

export function SlideVideo({
  slideProps,
  reactPlayerProps,
  indexInSlides
}: SlideVideoInterface) {
  const { play, stop, activeIndex } = useCarousel()
  const [isPlaying, setIsPlaying] = useState(false)

  const onPlay = useCallback(() => {
    setIsPlaying(true)
    stop()
  }, [])

  const onStop = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const onEnded = useCallback(() => {
    setIsPlaying(false)
    play()
  }, [])

  /**
   * @dev start playing when this slide is active and disable carousel rotation
   */
  useEffect(() => {
    if (indexInSlides === activeIndex) {
      onPlay()
    }
  }, [activeIndex, indexInSlides])

  return (
    <Carousel.Slide {...slideProps}>
      <ReactPlayer
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
