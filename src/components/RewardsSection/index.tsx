import React, { useRef } from 'react'
import styles from './RewardsSection.module.scss'
import RewardsCard from '@/components/RewardsCard'
import * as Images from '@/assets/images'

export interface RewardsSectionProps {
  rewards: {
    id: number
    rewardImage: string
    reward: string
    claimsLeft?: number
  }[]
}

const RewardsSection = ({ rewards }: RewardsSectionProps) => {
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
        <h6>Complete Quests to Earn These Rewards</h6>
        <div className={styles.navigationIcons}>
          <span className={styles.iconWrapper} onClick={scrollLeft}>
            <Images.ChevronLeft className={styles.icon} />
          </span>
          <span className={styles.iconWrapper} onClick={scrollRight}>
            <Images.ChevronRight className={styles.icon} />
          </span>
        </div>
      </div>
      <div className={styles.cardsContainer} ref={containerRef}>
        {rewards.map((reward) => (
          <RewardsCard
            key={reward.id}
            rewardImage={reward.rewardImage}
            claimsLeft={reward.claimsLeft}
            reward={reward.reward}
          />
        ))}
      </div>
    </div>
  )
}

export default RewardsSection
