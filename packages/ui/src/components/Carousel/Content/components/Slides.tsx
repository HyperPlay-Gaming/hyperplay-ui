import React from 'react'
import { ContentCarouselProps, Video } from '..'
import Player from './Player'

import styles from '../ContentCarousel.module.scss'
import classNames from 'classnames'

export interface SliderProps {
  items: ContentCarouselProps['items']
  width: number
  height: number
  onVideoStart?: () => void
  onVideoStop?: () => void
}

const Slides = ({
  items,
  width,
  height,
  onVideoStart,
  onVideoStop
}: SliderProps) => (
  <>
    {items.map((item, index) => {
      if (item.type === 'image') {
        return (
          <div
            className={classNames('keen-slider__slide', styles.slide)}
            key={index}
          >
            <div className={styles.imageWrap} style={{ width, height }}>
              {item.imageElement}
            </div>
          </div>
        )
      }

      if (item.type === 'youtube') {
        const { youtubeId } = item as Video

        return (
          <div
            className={classNames('keen-slider__slide', styles.slide)}
            key={index}
          >
            <Player
              videoId={youtubeId}
              width={width}
              height={height}
              onPlay={onVideoStart}
              onPause={onVideoStop}
            />
          </div>
        )
      }

      return <></>
    })}
  </>
)

export default Slides
