import React from 'react'

import classNames from 'classnames'

import Loading from '@/components/Loading'

import { QuestReward } from '../../types'
import { RewardI18n } from '../Reward'
import { RewardsRow } from './RewardsRow'
import styles from './index.module.scss'

interface RewardsI18n extends RewardI18n {
  rewards: string
}

export const defaultI18n: RewardsI18n = {
  rewards: 'Claimable Rewards',
  claimsLeft: 'Claims left',
  viewReward: 'View Reward',
  claimed: 'Claimed',
  claim: 'Claim'
}

export interface RewardsProps {
  rewards: QuestReward[]
  loading?: boolean
  numClaimed?: number
  numTotal?: number
  chainTooltips?: Record<string, string>
  i18n?: RewardsI18n
  onClaim: (reward: QuestReward) => void
}

export default function Rewards({
  rewards,
  loading,
  numClaimed,
  numTotal,
  chainTooltips,
  onClaim,
  i18n = defaultI18n
}: RewardsProps) {
  // create arrays by category for rewards
  const rewardsByCategory: Record<string, QuestReward[]> = {}
  for (const reward_i of rewards) {
    if (Object.hasOwn(rewardsByCategory, reward_i.chainName)) {
      rewardsByCategory[reward_i.chainName].push(reward_i)
    } else {
      rewardsByCategory[reward_i.chainName] = [reward_i]
    }
  }

  let rewardsContent = null
  if (rewards.length > 0) {
    rewardsContent = Object.keys(rewardsByCategory).map((rewardCategory) => (
      <RewardsRow
        rewards={rewardsByCategory[rewardCategory]}
        category={rewardCategory}
        key={rewardCategory}
        tooltip={chainTooltips?.[rewardCategory]}
        i18n={{
          claimsLeft: i18n.claimsLeft,
          viewReward: i18n.viewReward,
          claimed: i18n.claimed,
          claim: i18n.claim
        }}
        onClaim={onClaim}
      />
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
      <div>{rewardsContent}</div>
    </div>
  )
}
