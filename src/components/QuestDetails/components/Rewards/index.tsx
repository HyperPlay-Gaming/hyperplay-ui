import React from 'react'

import classNames from 'classnames'

import { QuestReward } from '../../types'
import Reward from '../Reward'
import styles from './index.module.scss'

export interface RewardsProps {
  rewards: QuestReward[]
  i18n?: {
    reward: string
  }
}

export default function Rewards({
  rewards,
  i18n = { reward: 'Reward' }
}: RewardsProps) {
  return (
    <div className={styles.rewardsContainer}>
      <div className={classNames('menu', styles.rewardTitle)}>
        {i18n.reward}
      </div>
      <div className={styles.rewardItemsContainer}>
        {rewards.map((reward_i) => (
          <Reward reward={reward_i} key={reward_i.title} />
        ))}
      </div>
    </div>
  )
}
