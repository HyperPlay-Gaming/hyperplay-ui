import React, { ElementRef, useRef } from 'react'
import { useMeasure } from 'react-use'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { Body } from '@/components/Typography'

import Controller from '../components/Controller'
import styles from './FeaturedCarousel.module.scss'

interface FeaturedCarouselProps {
  fullWidth?: boolean
  items: {
    title: string
    description: string
    imageElement: JSX.Element
    buttonElement: JSX.Element
  }[]
}

const FeaturedCarousel = (props: FeaturedCarouselProps) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const controller = useRef<ElementRef<typeof Controller>>(null)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      controller.current?.goTo(slider.track.details.rel)
    }
  })

  const goToSlide = (index: number) => instanceRef.current?.moveToIdx(index)

  return (
    <div className={styles.featuredCarousel} ref={ref}>
      <div className={styles.controller}>
        <Controller
          images={props.items.map(({ imageElement }) => imageElement)}
          interval={6000}
          onChange={goToSlide}
          ref={controller}
        />
      </div>
      <div className={styles.slider}>
        <div ref={sliderRef} className="keen-slider">
          {props.items.map(
            ({ title, description, imageElement, buttonElement }, index) => (
              <div className={`${styles.item} keen-slider__slide`} key={index}>
                <div className={styles['image-wrap']} style={{ width, height }}>
                  <div className={styles.content}>
                    <h1>{title}</h1>
                    <Body className={styles.description}>{description}</Body>
                    {buttonElement}
                  </div>
                  {imageElement}
                </div>
                <div className={styles.filter} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedCarousel
