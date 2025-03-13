import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  CarouselStylesNames,
  Carousel as MantineCarousel
} from '@mantine/carousel'
import cn from 'classnames'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay'

import Controller from './components/Controller'
import styles from './index.module.scss'

interface CarouselContextType {
  activeIndex: number
  setActiveIndex: (index: number) => void
  emblaApi: EmblaCarouselType | undefined
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
  autoplayDelayInMs: number
  canAutoRotate?: boolean
  // need to narrow type here for TS
  classNames?: Partial<Record<CarouselStylesNames | 'hpCarouselRoot', string>>
  className?: string
  childrenNotInCarousel?: React.ReactNode
}

const Carousel = ({
  autoplayDelayInMs,
  classNames,
  canAutoRotate,
  children,
  className,
  childrenNotInCarousel,
  ...props
}: CarouselProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>()

  const autoplay = useRef<AutoplayType>(
    Autoplay({ delay: autoplayDelayInMs, stopOnInteraction: false })
  )

  useEffect(() => {
    if (emblaApi) {
      if (canAutoRotate) {
        autoplay.current.play()
      } else {
        autoplay.current.stop()
      }
    }
  }, [emblaApi, canAutoRotate])

  const value = {
    activeIndex: activeSlideIndex,
    setActiveIndex: (index: number) => {
      setActiveSlideIndex(index)
      emblaApi?.scrollTo(index)
    },
    emblaApi
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

export default Carousel
