import React, { useRef, useState } from 'react'

import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { EmblaCarouselType } from 'embla-carousel-react'

import Controller from './components/Controller'
import styles from './index.module.scss'

export interface SlideData {
  title: string
  img: JSX.Element
}

export interface Carouselv2Props {
  items: SlideData[]
}

const Carouselv2 = (props: Carouselv2Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const autoplay = useRef(Autoplay({ delay: 6000 }))
  const [emblaApiRef, setEmblaApiRef] = useState<EmblaCarouselType>()

  function getSlides() {
    return props.items.map((item) => (
      <Carousel.Slide key={item.title}>
        {item.img}
        <h1 className={styles.title}>{item.title}</h1>
      </Carousel.Slide>
    ))
  }

  return (
    <div className={styles.carouselWrapper}>
      <Carousel
        getEmblaApi={(embla) => setEmblaApiRef(embla)}
        classNames={{
          slide: styles.slide
        }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        onSlideChange={(index) => setActiveIndex(index)}
        loop={true}
        withControls={false}
      >
        {getSlides()}
      </Carousel>
      <div className={styles.controller}>
        <Controller
          images={props.items.map(({ img }) => img)}
          onChange={(index) => emblaApiRef?.scrollTo(index)}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  )
}

export default Carouselv2
