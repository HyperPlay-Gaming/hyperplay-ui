import React, { useRef } from 'react'
import styles from './RewardsSection.module.scss'
import RewardsCard, { RewardsCardProps } from '@/components/RewardsCard'
import ArrowCircularButton from '../ArrowCircularButton'

export interface RewardsSectionProps {
  rewards: RewardsCardProps[]
  linkElement: React.ComponentType<{
    href?: string
    children?: React.ReactNode
  }>
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
