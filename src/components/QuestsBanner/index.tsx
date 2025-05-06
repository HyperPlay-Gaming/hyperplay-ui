import { useEffect, useRef, useState } from 'react'

import { Carousel } from '@mantine/carousel'
import cn from 'classnames'
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay'
import { EmblaCarouselType } from 'embla-carousel'

import { Line } from '@/assets/images'
import Button from '@/components/Button'

import styles from './QuestsBanner.module.scss'

export interface QuestsBannerSlideItemProp {
  bannerImageUrl: string
  title: string
  description: string
  buttonText: string
  onButtonTap: () => void
}

export interface QuestsBannerCarouselWidth {
  width: string
}

export interface QuestsBannerProps {
  classNames?: {
    root?: string
    content?: string
    slideContainer?: string
    slide?: string
    slideItem?: string
    bannerImage?: string
    bannerImageContainer?: string
    details?: string
    contentText?: string
    bannerTitle?: string
    bannerDescription?: string
    bannerButton?: string
    paginitionContainer?: string
    indicator?: string
    activateIndicator?: string
  }
  list?: QuestsBannerSlideItemProp[]
  canAutoRotate?: boolean
  autoplayDelayInMs?: number
  carousel?: QuestsBannerCarouselWidth
  onPageChangeTap: (pageIndex: number) => void
}

export const QuestsBanner = ({
  classNames,
  list = [],
  canAutoRotate = true,
  autoplayDelayInMs = 6000,
  carousel,
  onPageChangeTap
}: QuestsBannerProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const hasMoreThanOneItem = list.length > 1
  const autoplay = useRef<AutoplayType>(
    Autoplay({
      delay: autoplayDelayInMs,
      stopOnInteraction: false
    })
  )
  const [emblaApiRef, setEmblaApiRef] = useState<EmblaCarouselType>()

  const handlePageChange = (pageIndex: number) => {
    emblaApiRef?.scrollTo(pageIndex)
    setCurrentPage(pageIndex)
    onPageChangeTap(pageIndex)
  }

  useEffect(() => {
    if (emblaApiRef && hasMoreThanOneItem) {
      if (canAutoRotate) {
        autoplay.current.play()
      } else {
        autoplay.current.stop()
      }
    }
  }, [emblaApiRef, canAutoRotate, hasMoreThanOneItem])

  return (
    <div
      className={cn(styles.root, classNames?.root)}
      style={
        {
          '--banner-carousel-width': carousel?.width
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          styles.bannerImageContainer,
          classNames?.bannerImageContainer
        )}
      >
        {list[currentPage] && list[currentPage].bannerImageUrl ? (
          <img
            src={list[currentPage].bannerImageUrl}
            className={cn(styles.bannerImage, classNames?.bannerImage)}
          />
        ) : null}
      </div>
      <div className={cn(styles.content, classNames?.content)}>
        <div className={cn(styles.carouselWrapper)}>
          <Carousel
            getEmblaApi={(embla) =>
              hasMoreThanOneItem ? setEmblaApiRef(embla) : undefined
            }
            classNames={{
              slide: cn(styles.slide, classNames?.slide)
            }}
            onSlideChange={(index) => {
              setCurrentPage(index)
            }}
            plugins={hasMoreThanOneItem ? [autoplay.current] : []}
            onMouseEnter={() => {
              if (canAutoRotate && hasMoreThanOneItem) {
                autoplay.current?.stop()
              }
            }}
            onMouseLeave={() => {
              if (canAutoRotate && hasMoreThanOneItem) {
                autoplay.current?.stop()
                autoplay.current?.play()
              }
            }}
            withControls={false}
            withIndicators={false}
          >
            {list?.map(
              ({ title, description, buttonText, onButtonTap }, index) => (
                <Carousel.Slide
                  key={index}
                  className={cn(
                    styles.slideItem,
                    classNames?.slideItem,
                    index === currentPage ? styles.active : styles.inactive
                  )}
                >
                  <div className={cn(styles.details, classNames?.details)}>
                    <div
                      className={cn(
                        styles.contentText,
                        classNames?.contentText
                      )}
                    >
                      <h2
                        className={cn(
                          styles.bannerTitle,
                          classNames?.bannerTitle
                        )}
                      >
                        {title}
                      </h2>
                      <div
                        className={cn(
                          styles.bannerDescription,
                          classNames?.bannerDescription
                        )}
                      >
                        {description}
                      </div>
                    </div>
                    <Button
                      type="secondary"
                      onClick={onButtonTap}
                      className={cn(
                        styles.bannerButton,
                        classNames?.bannerButton
                      )}
                    >
                      {buttonText}
                    </Button>
                  </div>
                </Carousel.Slide>
              )
            )}
          </Carousel>
        </div>
        <div
          className={cn(
            styles.paginitionContainer,
            classNames?.paginitionContainer
          )}
        >
          {Array.from({ length: list.length }).map((_, index) => (
            <Line
              onClick={() => handlePageChange(index)}
              className={cn(
                styles.line,
                classNames?.indicator,
                index === currentPage ? styles.activateIndicator : '',
                index === currentPage ? classNames?.activateIndicator : ''
              )}
              key={`quests-banner-pagination-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestsBanner
