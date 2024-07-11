import React from 'react'

import { decimalUnits, parseNumIntoReadableString } from '@hyperplay/utils'
import classNames from 'classnames'

import { QuestReward } from '../../types'
import styles from './index.module.scss'

export interface RewardProps {
  reward: QuestReward
  i18n: {
    claimsLeft: string
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
    console.log(
      'reward.numToClaim.toString()',
      reward.numToClaim.toString(),
      ' formattedNumToClaim ',
      formattedNumToClaim
    )
    numToClaimComponent = (
      <div className={styles.numToClaim}>{`+${formattedNumToClaim}`}</div>
    )
  }
  return (
    <div key={reward.title} className={styles.rewardContainer}>
      <img src={reward.imageUrl} />
      <div className={classNames(styles.titleContainer, 'menu')}>
        <div className={styles.title}>{reward.title}</div>
        {numToClaimComponent}
      </div>
      {numClaimsLeftComponent}
    </div>
  )
}
