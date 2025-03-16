import React, { createContext, useContext, useRef, useState } from 'react'

import {
  CarouselStylesNames,
  Carousel as MantineCarousel
} from '@mantine/carousel'
import cn from 'classnames'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay, {
  AutoplayOptionsType,
  AutoplayType
} from 'embla-carousel-autoplay'

import Controller from './components/Controller'
import { SlideVideo } from './components/SlideVideo'
import styles from './index.module.scss'

export type { SlideVideoInterface } from './components/SlideVideo'
export type { ControllerProps } from './components/Controller'

interface CarouselContextType {
  activeIndex: number
  setActiveIndex: (index: number) => void
  emblaApi: EmblaCarouselType | undefined
  isRotating: () => void
  play: () => void
  stop: () => void
  totalSlideTime?: number
  getTimeUntilSlideFinished?: () => number | null
  slideTimeOverrideIndexToTimeMsMap: Record<number, number>
  setSlideTimeOverride: (slideIndex: number, timeInMs: number) => void
  timeUntilSlideFinishedOverrideIndexToTimeMsMap: Record<number, number>
  setTimeUntilSlideFinishedOverride: (
    slideIndex: number,
    timeInMs: number
  ) => void
}

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
)

export const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider')
  }
  return context
}

export interface CarouselProps
  extends React.ComponentProps<typeof MantineCarousel> {
  // need to narrow type here for TS
  classNames?: Partial<Record<CarouselStylesNames | 'hpCarouselRoot', string>>
  className?: string
  childrenNotInCarousel?: React.ReactNode
  autoplayOptions?: AutoplayOptionsType
}

const Carousel = ({
  classNames,
  children,
  className,
  childrenNotInCarousel,
  autoplayOptions,
  ...props
}: CarouselProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>()
  const [
    timeUntilSlideFinishedOverrideIndexToTimeMsMap,
    setTimeUntilSlideFinishedOverrideIndexToTimeMsMap
  ] = useState<Record<number, number>>({})
  const [
    slideTimeOverrideIndexToTimeMsMap,
    setSlideTimeOverrideIndexToTimeMsMap
  ] = useState<Record<number, number>>({})

  const setSlideTimeOverride = (slideIndex: number, timeInMs: number) => {
    setSlideTimeOverrideIndexToTimeMsMap((prevState) => ({
      ...prevState,
      [slideIndex]: timeInMs
    }))
  }

  const setTimeUntilSlideFinishedOverride = (
    slideIndex: number,
    timeInMs: number
  ) => {
    setTimeUntilSlideFinishedOverrideIndexToTimeMsMap((prevState) => ({
      ...prevState,
      [slideIndex]: timeInMs
    }))
  }

  const autoplay = useRef<AutoplayType>(
    Autoplay({ stopOnInteraction: false, ...autoplayOptions })
  )

  // if delay val is an object, it won't be useable in children anyways so let's return undefined in that case
  const delayValOrObj = autoplay.current.options.delay?.valueOf()
  let delayNum: number | undefined = undefined
  if (typeof delayValOrObj === 'number') {
    delayNum = delayValOrObj
  }

  const value = {
    activeIndex: activeSlideIndex,
    setActiveIndex: (index: number) => {
      setActiveSlideIndex(index)
      emblaApi?.scrollTo(index)
    },
    emblaApi,
    isRotating: () => autoplay.current.isPlaying(),
    play: () => autoplay.current.play(),
    stop: () => {
      autoplay.current.stop()
    },
    totalSlideTime: delayNum,
    getTimeUntilSlideFinished: autoplay.current.timeUntilNext,
    slideTimeOverrideIndexToTimeMsMap,
    setSlideTimeOverride,
    timeUntilSlideFinishedOverrideIndexToTimeMsMap,
    setTimeUntilSlideFinishedOverride
  }

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn(styles.root, classNames?.hpCarouselRoot, className)}>
        <MantineCarousel
          getEmblaApi={(embla) => setEmblaApi(embla)}
          classNames={{
            slide: cn(styles.slide, classNames?.slide),
            indicators: styles.indicators
          }}
          loop={true}
          withControls={false}
          withIndicators={true}
          plugins={[autoplay.current]}
          onSlideChange={(index) => setActiveSlideIndex(index)}
          {...props}
        >
          {children}
        </MantineCarousel>
        {childrenNotInCarousel}
      </div>
    </CarouselContext.Provider>
  )
}

Carousel.Slide = MantineCarousel.Slide
Carousel.Controller = Controller
Carousel.SlideVideo = SlideVideo

export default Carousel
