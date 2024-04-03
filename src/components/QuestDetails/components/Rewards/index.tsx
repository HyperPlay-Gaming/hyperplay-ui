import React from 'react'

import classNames from 'classnames'

import { QuestReward } from '../../types'
import Reward from '../Reward'
import styles from './index.module.scss'
import Loading from '@/components/Loading'

export interface RewardsProps {
  rewards: QuestReward[]
  loading?: boolean
  i18n?: {
    reward: string
  }
}

export default function Rewards({
  rewards,
  loading,
  i18n = { reward: 'Reward' }
}: RewardsProps) {
  let rewardsContent = null
  if (rewards.length > 0){
    rewardsContent = rewards.map((reward_i) => (
      <Reward reward={reward_i} key={reward_i.title} />
    ))
  }
  else if (loading){
    rewardsContent = <Loading />
  }
  return (
    <div className={styles.rewardsContainer}>
      <div className={classNames('menu', styles.rewardTitle)}>
        {i18n.reward}
      </div>
      <div className={styles.rewardItemsContainer}>
        {rewardsContent}
      </div>
    </div>
  )
}
