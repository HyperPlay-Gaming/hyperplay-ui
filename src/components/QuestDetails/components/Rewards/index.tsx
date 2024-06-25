import React from 'react'

import classNames from 'classnames'

import Loading from '@/components/Loading'

import { QuestReward } from '../../types'
import Reward from '../Reward'
import styles from './index.module.scss'

export interface RewardsProps {
  rewards: QuestReward[]
  loading?: boolean
  numClaimed?: number
  numTotal?: number
  i18n?: {
    rewards: string
  }
}

export default function Rewards({
  rewards,
  loading,
  numClaimed,
  numTotal,
  i18n = { rewards: 'Claimable Rewards' }
}: RewardsProps) {
  let rewardsContent = null
  if (rewards.length > 0) {
    rewardsContent = rewards.map((reward_i) => (
      <Reward reward={reward_i} key={reward_i.title} />
    ))
  } else if (loading) {
    rewardsContent = <Loading />
  }

  let numClaimedComponent = null
  if (numClaimed !== undefined && numTotal !== undefined) {
    numClaimedComponent = (
      <div className={classNames('button', styles.claimedContainer)}>
        <div className={styles.numClaimed}>{numClaimed}</div>
        <div className={styles.numTotal}>/</div>
        <div className={styles.numTotal}>{numTotal}</div>
      </div>
    )
  }
  return (
    <div className={styles.rewardsContainer}>
      <div className={styles.titleBar}>
        <div className={classNames('body-sm', styles.rewardTitle)}>
          {i18n.rewards}
        </div>
        {numClaimedComponent}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.rewardItemsContainer}>{rewardsContent}</div>
    </div>
  )
}
