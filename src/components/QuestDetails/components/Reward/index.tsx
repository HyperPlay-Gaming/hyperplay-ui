import React from 'react'

import classNames from 'classnames'

import { QuestReward } from '../../types'
import styles from './index.module.scss'

export interface RewardProps {
  reward: QuestReward
}

export default function Reward({ reward }: RewardProps) {
  return (
    <div key={reward.title} className={styles.rewardContainer}>
      <img src={reward.imageUrl} />
      <div className={classNames(styles.title, 'body')}>{reward.title}</div>
    </div>
  )
}
