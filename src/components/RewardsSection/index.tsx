import React, { useRef } from 'react'
import styles from './RewardsSection.module.scss'
import RewardsCard from '@/components/RewardsCard'
import ArrowCircularButton from '../ArrowCircularButton'
import * as Images from '@/assets/images'

export interface RewardsSectionProps {
  rewards: {
    id: number
    rewardImage: string
    reward: string
    claimsLeft?: number
  }[]
  i18n?: {
    header?: string
    claimsLabel?: string
    claimsLeftLabel?: string
  }
}

const defaultI18n = {
  header: 'Complete Quests to Earn These Rewards',
  claimsLabel: 'Claims left',
  claimsLeftLabel: 'Unlimited'
}

const RewardsSection = ({
  rewards,
  i18n = defaultI18n
}: RewardsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -271, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 271, behavior: 'smooth' })
    }
  }

  if (!rewards || rewards.length === 0) {
    return null
  }

  return (
    <div className={styles.rewardsSection}>
      <div className={styles.header}>
        <h6>{i18n.header}</h6>
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
      </div>
      <div className={styles.cardsContainer} ref={containerRef}>
        {rewards.map((reward) => (
          <RewardsCard
            key={reward.id}
            rewardImage={reward.rewardImage}
            claimsLeft={reward.claimsLeft}
            reward={reward.reward}
            i18n={{
              claimsLabel: i18n.claimsLabel,
              claimsLeftLabel: i18n.claimsLeftLabel
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default RewardsSection
