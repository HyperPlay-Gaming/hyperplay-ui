import React from 'react'

import classNames from 'classnames'

import { QuestReward } from '../../types'
import styles from './index.module.scss'

export interface RewardProps {
  reward: QuestReward
  i18n: {
    claimsLeft: string
  }
}

function convertToScientificNotation(num: string | number) {
  return Number(num).toPrecision(3)
}

export default function Reward({ reward, i18n }: RewardProps) {
  let numClaimsLeftComponent = null
  if (reward.numOfClaimsLeft) {
    numClaimsLeftComponent = (
      <div
        className={classNames('menu-item', styles.claimsLeft)}
      >{`${convertToScientificNotation(reward.numOfClaimsLeft)} ${
        i18n.claimsLeft
      }`}</div>
    )
  }
  let numToClaimComponent = null
  if (reward.numToClaim) {
    numToClaimComponent = (
      <div className={styles.numToClaim}>{`+ ${convertToScientificNotation(
        reward.numToClaim
      )}`}</div>
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
