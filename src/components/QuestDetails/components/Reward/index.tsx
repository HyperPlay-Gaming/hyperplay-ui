import React from 'react'

import classNames from 'classnames'

import { QuestReward } from '../../types'
import styles from './index.module.scss'

export interface RewardProps {
  reward: QuestReward
}

export default function Reward({ reward }: RewardProps) {
  return (
    <div
      key={reward.title}
      className={classNames(styles.rewardContainer, 'gradientBorderOnHover')}
    >
      <img src={reward.imageUrl} />
      <div className={styles.notHoveredContainer}></div>
      <div className={styles.hoveredContainer}></div>
      {reward.title}
    </div>
  )
}
