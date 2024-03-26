import React, { useEffect, useRef, useState } from 'react'

import { Carousel } from '@mantine/carousel'
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay'
import { EmblaCarouselType } from 'embla-carousel-react'

import Controller from './components/Controller'
import styles from './index.module.scss'

export interface SlideData {
  title: string
  slideElement: JSX.Element
  thumbnail?: JSX.Element
  disableGradient?: boolean
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
      <Carousel.Slide
        key={item.key}
        id={item.disableGradient ? 'disableGradient' : 'enableGradient'}
      >
        {item.slideElement}
        <div className={styles.title}>
          <div className={styles.titleText}>{item.title}</div>
          {item.button ?? null}
        </div>
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
          if (canAutoRotate) {
            autoplay.current.stop()
          }
        }}
        onMouseLeave={() => {
          if (canAutoRotate) {
            // Internally it is checking if timer is set, and since it can be, it will make .reset() never work
            autoplay.current.stop()
            autoplay.current.play()
          }
        }}
        onSlideChange={(index) => {
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

            onThumbnailHandler?.(index)
          }}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  )
}

export default Carouselv2
