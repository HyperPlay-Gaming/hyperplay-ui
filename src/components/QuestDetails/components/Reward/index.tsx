import React from 'react'

import { decimalUnits, parseNumIntoReadableString } from '@hyperplay/utils'
import classNames from 'classnames'

import { LinkExternal } from '@/assets/images'

import { QuestReward } from '../../types'
import styles from './index.module.scss'

export interface RewardProps {
  reward: QuestReward
  i18n: {
    claimsLeft: string
    viewReward: string
    claimed: string
  }
}

export default function Reward({ reward, i18n }: RewardProps) {
  let numClaimsLeftComponent = null
  if (reward.numOfClaimsLeft) {
    const formattedNumOfClaimsLeft = parseNumIntoReadableString({
      num: reward.numOfClaimsLeft,
      units: decimalUnits,
      minValue: '0.0001',
      maxValue: '999999999'
    })
    numClaimsLeftComponent = (
      <div
        className={classNames('menu-item', styles.claimsLeft)}
      >{`${formattedNumOfClaimsLeft} ${i18n.claimsLeft}`}</div>
    )
  }
  let numToClaimComponent = null
  if (reward.numToClaim) {
    const formattedNumToClaim = parseNumIntoReadableString({
      num: reward.numToClaim,
      units: decimalUnits,
      minValue: '0.0001',
      maxValue: '999999999999'
    })
    numToClaimComponent = (
      <div className={styles.numToClaim}>{`+${formattedNumToClaim}`}</div>
    )
  }

  const onViewRewardClick = () => {
    if (!reward.marketplaceUrl) {
      return
    }

    window.open(reward.marketplaceUrl, '_blank')
  }

  return (
    <div key={reward.title} className={styles.rewardContainer}>
      {reward.isClaimed ? (
        <div className={styles.isClaimed}>{i18n.claimed}</div>
      ) : null}
      <div className={styles.viewRewardContainer} onClick={onViewRewardClick}>
        <LinkExternal className={styles.linkExternalIcon} />
        {i18n.viewReward}
      </div>
      <img src={reward.imageUrl} />
      <div className={classNames(styles.titleContainer, 'menu')}>
        <div className={styles.title}>{reward.title}</div>
        {numToClaimComponent}
      </div>
      {numClaimsLeftComponent}
    </div>
  )
}
