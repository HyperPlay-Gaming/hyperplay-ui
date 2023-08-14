import React, { useRef, useState } from 'react'

import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { EmblaCarouselType } from 'embla-carousel-react'

import Controller from './components/Controller'
import styles from './index.module.scss'

export interface SlideData {
  title: string
  slideElement: JSX.Element
  thumbnail?: JSX.Element
  disableGradient?: boolean
  button?: JSX.Element
}

export interface Carouselv2Props {
  items: SlideData[]
  autoplayDelayInMs: number
}

const Carouselv2 = (props: Carouselv2Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const autoplay = useRef(Autoplay({ delay: props.autoplayDelayInMs }))
  const [emblaApiRef, setEmblaApiRef] = useState<EmblaCarouselType>()

  function getSlides() {
    return props.items.map((item) => (
      <Carousel.Slide
        key={item.title}
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
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        onSlideChange={(index) => setActiveIndex(index)}
        loop={true}
        withControls={false}
        withIndicators={true}
      >
        {getSlides()}
      </Carousel>
      <div className={styles.controller}>
        <Controller
          images={props.items.map(({ slideElement, thumbnail }) =>
            thumbnail ? thumbnail : slideElement
          )}
          onChange={(index) => emblaApiRef?.scrollTo(index)}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  )
}

export default Carouselv2
