import React, { useEffect, useRef, useState } from 'react'

import { Carousel } from '@mantine/carousel'
import type { EmblaCarouselType } from 'embla-carousel'
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay'

import Controller from './components/Controller'
import styles from './index.module.scss'

export interface SlideData {
  slideElement: JSX.Element
  thumbnail?: JSX.Element
  button?: JSX.Element
  key?: string
}

export interface Carouselv2Props {
  items: SlideData[]
  autoplayDelayInMs: number
  controllerLayout?: 'attached' | 'detached'
  canAutoRotate?: boolean
  onThumbnailHandler?: (index: number) => void
}

const Carouselv2 = ({
  canAutoRotate = true,
  onThumbnailHandler,
  ...props
}: Carouselv2Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const autoplay = useRef<AutoplayType>(
    Autoplay({ delay: props.autoplayDelayInMs, stopOnInteraction: false })
  )
  const [emblaApiRef, setEmblaApiRef] = useState<EmblaCarouselType>()
  const controllerLayout = props.controllerLayout ?? 'attached'

  useEffect(() => {
    if (emblaApiRef) {
      if (canAutoRotate) {
        autoplay.current.play()
      } else {
        autoplay.current.stop()
      }
    }
  }, [emblaApiRef, canAutoRotate])

  function getSlides() {
    return props.items.map((item) => (
      <Carousel.Slide key={item.key}>
        {item.slideElement}
        {item.button && <div className={styles.title}>{item.button}</div>}
      </Carousel.Slide>
    ))
  }

  return (
    <div className={styles.carouselWrapper}>
      <Carousel
        getEmblaApi={(embla) => setEmblaApiRef(embla)}
        classNames={{
          slide: styles.slide,
          indicators: styles.indicators
        }}
        plugins={[autoplay.current]}
        onMouseEnter={() => {
          console.log('canAutoRotate onMouseEnter', canAutoRotate)
          if (canAutoRotate) {
            autoplay.current.stop()
          }
        }}
        onMouseLeave={() => {
          console.log('canAutoRotate onMouseLeave', canAutoRotate)
          if (canAutoRotate) {
            // Internally it is checking if timer is set, and since it can be, it will make .reset() never work
            autoplay.current.stop()
            autoplay.current.play()
          }
        }}
        onSlideChange={(index) => {
          console.log('onSlideChange', index)
          setActiveIndex(index)
        }}
        loop={true}
        withControls={false}
        withIndicators={true}
      >
        {getSlides()}
      </Carousel>
      <div
        className={
          controllerLayout === 'attached'
            ? styles.controllerAttached
            : styles.controllerDetached
        }
      >
        <Controller
          images={props.items.map(({ slideElement, thumbnail }) =>
            thumbnail ? thumbnail : slideElement
          )}
          onChange={(index) => {
            emblaApiRef?.scrollTo(index)
            console.log('Controller onChange scrollTo', index)

            onThumbnailHandler?.(index)
          }}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  )
}

export default Carouselv2
