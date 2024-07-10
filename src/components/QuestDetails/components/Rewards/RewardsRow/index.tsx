import React from 'react'

import { Tooltip } from '@mantine/core'

import Sticker from '@/components/Sticker'

import { QuestReward } from '../../../types'
import Reward from '../../Reward'
import styles from './index.module.scss'

export interface RewardsRowProps {
  category: string
  rewards: QuestReward[]
  tooltip?: string
}

export function RewardsRow({ category, rewards, tooltip }: RewardsRowProps) {
  let rewardsContent = null
  if (rewards.length > 0) {
    rewardsContent = rewards.map((reward_i) => (
      <Reward reward={reward_i} key={reward_i.title} />
    ))
  }
  console.log('reward row tooltip ', tooltip, category)
  let tooltipComponent = null
  if (tooltip) {
    tooltipComponent = (
      <Tooltip
        label={tooltip}
        position="bottom"
        withArrow
        classNames={{ tooltip: styles.tooltip }}
        multiline
      >
        <div className={styles.letterI}>i</div>
      </Tooltip>
    )
  }
  return (
    <div className={styles.rewardsRowContainer}>
      <Sticker
        styleType="secondary"
        variant="outlined"
        className={styles.sticker}
      >
        {category}
        {tooltipComponent}
      </Sticker>
      <div className={styles.rewardItemsContainer}>{rewardsContent}</div>
    </div>
  )
}
