import React, { ElementRef, useRef, useState } from 'react'

import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

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
  const autoplay = useRef(Autoplay({ delay: 2000 }))
  //   const controller = useRef<ElementRef<typeof Controller>>(null)
  function getSlides() {
    return props.items.map((item) => (
      <Carousel.Slide key={item.title}>
        {item.img}
        <h1 className={styles.title}>{item.title}</h1>
      </Carousel.Slide>
    ))
  }
  return (
    <Carousel
      classNames={{ slide: styles.slide }}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      onSlideChange={(index) => setActiveIndex(index)}
    >
      {getSlides()}
      <div className={styles.controller}>
        <Controller
          images={props.items.map(({ img }) => img)}
          onChange={(index) => console.log('changing to slide ', index)}
          activeIndex={activeIndex}
        />
      </div>
    </Carousel>
  )
}

export default Carouselv2
