import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './RewardsSection.module.scss'
import RewardsCard, { RewardsCardProps } from '@/components/RewardsCard'
import ArrowCircularButton from '../ArrowCircularButton'
import { dummyData } from './constants'

export interface RewardsSectionProps {
  rewards: RewardsCardProps[]
  Link: React.ComponentType<{ children: React.ReactNode; href: string }>
  isLoading?: boolean
  i18n?: {
    header?: string
  }
}

const defaultI18n = {
  header: 'Complete Quests to Earn These Rewards'
}

const RewardsSection = ({
  rewards,
  Link: LinkElement,
  isLoading,
  i18n = defaultI18n
}: RewardsSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    loop: false
  })

  if (isLoading) {
    rewards = dummyData
  }

  const [isScrollable, setIsScrollable] = useState(false)

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

  useEffect(() => {
    if (!emblaApi) return

    // Check if the carousel is scrollable
    setIsScrollable(emblaApi.canScrollNext() || emblaApi.canScrollPrev())
  }, [emblaApi])

  if (!rewards || rewards.length === 0) {
    return null
  }

  return (
    <div className={styles.rewardsSection} data-testid="rewards-section">
      <div className={styles.header} data-testid="rewards-header">
        <h6>{i18n.header}</h6>
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
          <div className={styles.emblaContainer}>
            {rewards.map((reward) => (
              <div className={styles.emblaSlide} key={reward.id}>
                <LinkElement
                  data-testid="reward-link"
                  href={`/quests/${reward.questId}`}
                >
                  <RewardsCard
                    id={reward.id}
                    questId={reward.questId}
                    rewardImage={reward.rewardImage}
                    claimsLeft={reward.claimsLeft}
                    reward={reward.reward}
                    isLoading={isLoading}
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
