import React, { ElementRef, useEffect, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { useMeasure } from 'react-use'
import classNames from 'classnames'

import styles from './ContentCarousel.module.scss'
import 'keen-slider/keen-slider.min.css'
import Controller from '../components/Controller'
import Slides from './components/Slides'
import getThumbnails from './utils/getThumbnails'

export interface Media {
  type: 'image' | 'youtube'
}

export interface Video extends Media {
  type: 'youtube'
  thumbnailElement: JSX.Element
  youtubeId: string
}

export interface Image extends Media {
  type: 'image'
  imageElement: JSX.Element
}

export interface ContentCarouselProps {
  items: (Video | Image)[]
}

const ContentCarousel = ({ items }: ContentCarouselProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const controller = useRef<ElementRef<typeof Controller>>(null)
  const [sliderRef, sliderInstance] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      controller.current?.goTo(slider.track.details.rel)
    }
  })

  const thumbnails = getThumbnails(items)

  const handleVideoPause = () => {
    controller.current?.continue()
    setIsPlaying(false)
  }
  const handleVideoStart = () => {
    controller.current?.pause()
    setIsPlaying(true)
  }
  const handleControllerChange = (index: number) => {
    sliderInstance.current?.moveToIdx(index)
  }

  useEffect(() => {
    setTimeout(() => {
      sliderInstance.current?.update()
    })
  }, [])

  return (
    <div className={classNames(styles.expand)} ref={ref}>
      <div ref={sliderRef} className={classNames('keen-slider')}>
        <Slides
          items={items}
          width={width}
          height={height}
          onVideoStart={handleVideoStart}
          onVideoStop={handleVideoPause}
        />
      </div>

      <div className={styles.controlsWrapper}>
        <Controller
          images={thumbnails}
          interval={8000}
          onChange={handleControllerChange}
          hidden={isPlaying}
          ref={controller}
        />
      </div>
    </div>
  )
}

export default ContentCarousel
