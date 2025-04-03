import React, { useRef, useState, useEffect, ComponentType } from 'react'
import styles from './RewardsSection.module.scss'
import RewardsCard, { RewardsCardProps } from '@/components/RewardsCard'
import ArrowCircularButton from '../ArrowCircularButton'

/**
 * LinkComponentProps defines the required props that a link component should have.
 * This ensures compatibility with various link implementations like:
 * - HTML anchor tags
 * - Next.js Link components
 */
export interface LinkComponentProps {
  href?: string
  children?: React.ReactNode
}

export interface RewardsSectionProps {
  rewards: RewardsCardProps[]
  /**
   * Component to use for link navigation. Must accept href and children props.
   * Compatible with Next.js Link, React Router Link, or HTML anchor.
   */
  linkElement: ComponentType<LinkComponentProps>
  i18n?: {
    header?: string
  }
}

const defaultI18n = {
  header: 'Complete Quests to Earn These Rewards'
}

const RewardsSection = ({
  rewards,
  linkElement: LinkElement,
  i18n = defaultI18n
}: RewardsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  // Check if content is scrollable on mount and window resize
  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current
        setIsScrollable(scrollWidth > clientWidth)
      }
    }

    // Initial check
    checkScrollable()

    // Add resize listener
    window.addEventListener('resize', checkScrollable)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScrollable)
    }
  }, [rewards])

  const scrollLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = 271

      // If at the beginning or close to it, scroll to the end
      if (container.scrollLeft <= scrollAmount) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      }
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = 271

      // If at the end or close to it, scroll back to the beginning
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - scrollAmount
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  if (!rewards || rewards.length === 0) {
    return null
  }

  return (
    <div className={styles.rewardsSection}>
      <div className={styles.header}>
        <h6>{i18n.header}</h6>
        {isScrollable && (
          <div className={styles.navigationIcons}>
            <ArrowCircularButton
              classNames={{ root: styles.leftButton }}
              isLeftButton
              onClick={scrollLeft}
            />
            <ArrowCircularButton
              classNames={{ root: styles.rightButton }}
              onClick={scrollRight}
              isLeftButton={false}
            />
          </div>
        )}
      </div>
      <div className={styles.cardsContainer} ref={containerRef}>
        {rewards.map((reward) => (
          <LinkElement key={reward.questId}>
            <RewardsCard
              id={reward.id}
              key={reward.id}
              questId={reward.questId}
              rewardImage={reward.rewardImage}
              claimsLeft={reward.claimsLeft}
              reward={reward.reward}
            />
          </LinkElement>
        ))}
      </div>
    </div>
  )
}

export default RewardsSection
