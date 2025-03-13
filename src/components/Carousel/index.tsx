import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useInterval } from 'react-use'

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

  const autoplay = useRef<AutoplayType>(
    Autoplay({ stopOnInteraction: false, ...autoplayOptions })
  )

  useInterval(
    () => console.log('carousel is playing: ', activeSlideIndex),
    1000
  )

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
      console.log('stop the carousel')
      autoplay.current.stop()
    }
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
