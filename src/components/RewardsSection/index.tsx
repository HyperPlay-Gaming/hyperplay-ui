import React, { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './RewardsSection.module.scss'
import RewardsCard, { RewardsCardProps } from '@/components/RewardsCard'
import ArrowCircularButton from '../ArrowCircularButton'
import { dummyData } from './constants'
import cx from 'classnames'

type ClassNames = {
  root?: string
  container?: string
  slide?: string
}
export interface RewardsSectionProps {
  rewards: RewardsCardProps[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: any
  isLoading?: boolean
  classNames?: ClassNames
  i18n?: {
    header?: string
  }
}

const defaultI18n = {
  header: 'Complete Quests to Earn These Rewards'
}

type EmblaOptionsType = {
  align: 'start' | 'center' | 'end'
  dragFree: boolean
  loop: boolean
  slidesToScroll: number
}

const emblaOptions: EmblaOptionsType = {
  align: 'start',
  dragFree: true,
  loop: false,
  slidesToScroll: 3
}

const RewardsSection = ({
  rewards,
  Link: LinkElement,
  isLoading,
  classNames,
  i18n = defaultI18n
}: RewardsSectionProps) => {
  const [visibleSlides, setVisibleSlides] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)

  const [isScrollable, setIsScrollable] = useState(false)
  const [timeoutReached, setTimeoutReached] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setTimeoutReached(true)
      }, 5000)
    } else {
      setTimeoutReached(false)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isLoading])

  if (isLoading) {
    rewards = dummyData
  }

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return

    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev()
    } else {
      // If we're at the beginning, scroll to the end
      emblaApi.scrollTo(emblaApi.scrollSnapList().length - 1)
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext()
    } else {
      // If we're at the end, scroll to the beginning
      emblaApi.scrollTo(0)
    }
  }, [emblaApi])

  // Function to calculate and set the number of visible slides
  const calculateVisibleSlides = useCallback(() => {
    if (!emblaApi || !containerRef.current) return

    // Get the container width and a slide element width
    const containerWidth = containerRef.current.offsetWidth
    const slideElements = containerRef.current.querySelectorAll(
      `.${styles.emblaSlide}`
    )

    if (slideElements.length === 0) return

    // Get the width of the first slide element (assuming all slides have the same width)
    const slideWidth = slideElements[0].getBoundingClientRect().width

    // Calculate how many slides can fit in the container
    // We subtract a small amount to account for potential gaps or margins
    const visibleCount = Math.max(1, Math.floor(containerWidth / slideWidth))

    // Update the visible slides count if it has changed
    setVisibleSlides(visibleCount)

    // If the embla API is initialized, update the slidesToScroll option
    if (emblaApi) {
      emblaApi.reInit({
        ...emblaOptions,
        slidesToScroll: visibleCount
      })
    }
  }, [emblaApi])

  // Effect to handle resize events
  useEffect(() => {
    if (!emblaApi) return

    // Calculate visible slides initially
    calculateVisibleSlides()

    // Add resize listener
    const handleResize = () => {
      calculateVisibleSlides()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [emblaApi, calculateVisibleSlides])

  useEffect(() => {
    if (!emblaApi) return

    // Check if the carousel is scrollable
    setIsScrollable(
      emblaApi.canScrollNext() ||
        emblaApi.canScrollPrev() ||
        rewards.length > visibleSlides
    )

    // Calculate visible slides when rewards change
    calculateVisibleSlides()
  }, [emblaApi, rewards, visibleSlides, calculateVisibleSlides])

  if (!rewards || rewards.length === 0 || (isLoading && timeoutReached)) {
    return null
  }

  return (
    <div
      className={cx(styles.rewardsSection, classNames?.root)}
      data-testid="rewards-section"
      ref={containerRef}
    >
      <div className={styles.header} data-testid="rewards-header">
        <div className="title">{i18n.header}</div>
        {isScrollable && (
          <div className={styles.navigationIcons}>
            <ArrowCircularButton
              classNames={{ root: styles.leftButton }}
              isLeftButton
              onClick={scrollPrev}
              data-testid="arrow-button"
            />
            <ArrowCircularButton
              classNames={{ root: styles.rightButton }}
              onClick={scrollNext}
              isLeftButton={false}
              data-testid="arrow-button"
            />
          </div>
        )}
      </div>
      <div className={styles.embla}>
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={cx(styles.emblaContainer, classNames?.container)}>
            {rewards.map((reward) => (
              <div
                className={cx(styles.emblaSlide, classNames?.slide)}
                key={reward.id}
              >
                <LinkElement
                  data-testid="reward-link"
                  href={`/quests/${reward.questId}`}
                >
                  <RewardsCard
                    id={reward.id}
                    questId={reward.questId}
                    rewardImage={reward.rewardImage}
                    rewardType={reward.rewardType}
                    claimsLeft={reward.claimsLeft}
                    rewardName={reward.rewardName}
                    amountPerUser={reward.amountPerUser}
                    isLoading={isLoading}
                    decimals={reward.decimals}
                  />
                </LinkElement>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardsSection
