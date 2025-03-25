'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react'

import {
  CarouselStylesNames,
  Carousel as MantineCarousel
} from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import cn from 'classnames'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay, {
  AutoplayOptionsType,
  AutoplayType
} from 'embla-carousel-autoplay'

import { ChevronLeft, ChevronRight } from '@/assets/images'

import Controller from './components/Controller'
import { SlideVideo } from './components/SlideVideo'
import styles from './index.module.scss'

export type { SlideVideoInterface } from './components/SlideVideo'
export type { ControllerProps } from './components/Controller'

interface CarouselContextType {
  activeIndex: number
  setActiveIndex: (index: number) => void
  isRotating: () => void
  play: () => void
  stop: () => void
  totalSlideTime?: number
  getTimeUntilSlideFinished?: () => number | null
  slideTimeOverrideIndexToTimeMsMap: Record<number, number>
  setSlideTimeOverride: (slideIndex: number, timeInMs: number) => void
  timeUntilSlideFinishedOverrideIndexToTimeMsMap: Record<
    number,
    { timeLeftInMs: number; lastUpdatedMsSinceEpoch: number }
  >
  setTimeUntilSlideFinishedOverride: (
    slideIndex: number,
    timeInMs: number
  ) => void
  onVideoPlay: (slideIndex: number) => void
  onVideoPaused: (slideIndex: number) => void
  onVideoEnded: (slideIndex: number) => void
  isVideoSlidePlaying: Record<number, boolean>
  isVideoSlide: boolean
  /** Show a loading skeleton while loading */
  isLoading?: boolean
  emblaApi?: EmblaCarouselType
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
  /** Show a loading skeleton while loading */
  isLoading?: boolean
}

const Carousel = ({
  classNames,
  children,
  className,
  childrenNotInCarousel,
  autoplayOptions,
  isLoading,
  ...props
}: CarouselProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(
    undefined
  )
  const [
    timeUntilSlideFinishedOverrideIndexToTimeMsMap,
    setTimeUntilSlideFinishedOverrideIndexToTimeMsMap
  ] = useState<
    Record<number, { timeLeftInMs: number; lastUpdatedMsSinceEpoch: number }>
  >({})
  const [
    slideTimeOverrideIndexToTimeMsMap,
    setSlideTimeOverrideIndexToTimeMsMap
  ] = useState<Record<number, number>>({})
  const [videoSlides, setVideoSlides] = useState<number[]>([])

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
      [slideIndex]: {
        timeLeftInMs: timeInMs,
        lastUpdatedMsSinceEpoch: Date.now()
      }
    }))
  }

  const autoplay = useRef<AutoplayType>(
    Autoplay({ stopOnInteraction: false, ...autoplayOptions })
  )

  const isMobile = useMediaQuery('(max-width: 599px)', false, {
    getInitialValueInEffect: true
  })

  const slideAutoplayStopped = isMobile || isLoading

  const setActiveSlideIndexAndResetAutoplay = useCallback(
    (idx: number) => {
      setActiveSlideIndex(idx)
      emblaApi?.scrollTo(idx)
      // no autoplay on mobile
      if (!isMobile) {
        autoplay.current?.reset()
        autoplay.current?.play()
      }
    },
    [setActiveSlideIndex, autoplay.current, emblaApi]
  )

  // if delay val is an object, it won't be useable in children anyways so let's return undefined in that case
  const delayValOrObj = autoplay.current.options.delay?.valueOf()
  let delayNum: number | undefined = undefined
  if (typeof delayValOrObj === 'number') {
    delayNum = delayValOrObj
  }

  const scrollNextSlideCallback = useCallback(
    (jump?: boolean) => {
      emblaApi?.scrollNext(jump)
    },
    [emblaApi]
  )

  /**
   * @dev we keep track of each slide's video playing status to control react player.
   * this is because multiple video slides may be present with different playing statuses per slide.
   */
  const [isVideoSlidePlaying, setIsVideoSlidePlaying] = useState<
    Record<number, boolean>
  >({})

  const setVideoSlidePlaying = (slideIndex: number, isPlaying: boolean) => {
    setIsVideoSlidePlaying((prevState) => ({
      ...prevState,
      [slideIndex]: isPlaying
    }))
  }

  const onVideoPlay = useCallback(
    (slideIndex: number) => {
      // keep each arr val unique
      const vidSlides = new Set(videoSlides)
      vidSlides.add(slideIndex)
      setVideoSlides([...vidSlides.values()])
      setVideoSlidePlaying(slideIndex, true)
      autoplay.current.stop()
    },
    [autoplay, videoSlides]
  )

  const onVideoPaused = useCallback(
    (slideIndex: number) => {
      setVideoSlidePlaying(slideIndex, false)
      if (
        !Object.hasOwn(
          timeUntilSlideFinishedOverrideIndexToTimeMsMap,
          slideIndex
        )
      ) {
        return
      }
      const {
        timeLeftInMs: timeLeftInMsOld,
        lastUpdatedMsSinceEpoch: lastUpdatedMsSinceEpochOld
      } = timeUntilSlideFinishedOverrideIndexToTimeMsMap[slideIndex]
      const newTimeLeftInMs =
        timeLeftInMsOld - (Date.now() - lastUpdatedMsSinceEpochOld)
      setTimeUntilSlideFinishedOverride(slideIndex, newTimeLeftInMs)
    },
    [timeUntilSlideFinishedOverrideIndexToTimeMsMap]
  )

  const onVideoEnded = useCallback(
    (slideIndex: number) => {
      setVideoSlidePlaying(slideIndex, false)
      autoplay.current?.play()
      if (!slideAutoplayStopped) {
        scrollNextSlideCallback()
      }
    },
    [autoplay.current, scrollNextSlideCallback]
  )

  const value = {
    activeIndex: activeSlideIndex,
    setActiveIndex: (index: number) => {
      setActiveSlideIndexAndResetAutoplay(index)
    },
    isRotating: () => autoplay.current.isPlaying(),
    play: () => autoplay.current?.play(),
    stop: () => {
      autoplay.current.stop()
    },
    totalSlideTime: delayNum,
    getTimeUntilSlideFinished: autoplay.current.timeUntilNext,
    slideTimeOverrideIndexToTimeMsMap,
    setSlideTimeOverride,
    timeUntilSlideFinishedOverrideIndexToTimeMsMap,
    setTimeUntilSlideFinishedOverride,
    onVideoPlay,
    onVideoPaused,
    onVideoEnded,
    isVideoSlidePlaying,
    isVideoSlide: videoSlides.some((val) => val === activeSlideIndex),
    isLoading,
    emblaApi
  }

  let loaderSlideSkeleton = null
  if (isLoading) {
    loaderSlideSkeleton = (
      <Carousel.Slide
        key="carousel-loader-skeleton"
        classNames={{ slide: styles.loading }}
      >
        <img width={1920} height={1080} />
      </Carousel.Slide>
    )
  }

  let childrenToShow = children
  if (isLoading) {
    childrenToShow = null
  }

  return (
    <CarouselContext.Provider value={value}>
      <div
        className={cn(styles.root, classNames?.hpCarouselRoot, className)}
        data-testid={'carousel-root'}
      >
        <MantineCarousel
          getEmblaApi={setEmblaApi}
          classNames={{
            root: styles.mantineCarouselRoot,
            slide: cn(styles.slide, classNames?.slide),
            indicators: styles.indicators,
            controls: styles.controls,
            control: styles.control
          }}
          loop={true}
          withControls={!isMobile}
          withIndicators={true}
          plugins={slideAutoplayStopped ? [] : [autoplay.current]}
          onSlideChange={(index) => setActiveSlideIndexAndResetAutoplay(index)}
          previousControlIcon={
            <ChevronLeft
              data-testid={'carousel-prev-control-icon'}
              width={'9px'}
              height={'15px'}
            />
          }
          nextControlIcon={
            <ChevronRight
              data-testid={'carousel-next-control-icon'}
              width={'9px'}
              height={'15px'}
            />
          }
          {...props}
        >
          {childrenToShow}
          {loaderSlideSkeleton}
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
