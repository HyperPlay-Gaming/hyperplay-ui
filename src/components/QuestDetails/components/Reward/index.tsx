import React from 'react'

import { decimalUnits, parseNumIntoReadableString } from '@hyperplay/utils'
import classNames from 'classnames'

import { LinkExternal } from '@/assets/images'
import Button from '@/components/Button'
import Loading from '@/components/Loading'

import { QuestReward } from '../../types'
import styles from './index.module.scss'

export interface RewardI18n {
  claimsLeft: string
  viewReward: string
  claimed: string
  claim: string
}

export interface RewardProps {
  reward: QuestReward
  onClaim: (reward: QuestReward) => void
  i18n: RewardI18n
}

export default function Reward({ reward, i18n, onClaim }: RewardProps) {
  let numClaimsLeftComponent = null

  if (reward.numClaimsLeft) {
    const formattedNumOfClaimsLeft = parseNumIntoReadableString({
      num: reward.numClaimsLeft,
      units: decimalUnits,
      minValue: '0',
      maxValue: '9999'
    })

    const emptyClaims = Number(reward.numClaimsLeft) === 0

    numClaimsLeftComponent = (
      <div className={styles.claimsContainer}>
        <div
          className={classNames(
            styles.dot,
            emptyClaims ? styles.redDot : styles.greenDot
          )}
        />
        <div
          className={classNames('menu-item', styles.claims)}
        >{`${formattedNumOfClaimsLeft} ${i18n.claimsLeft}`}</div>
      </div>
    )
  }

  let formattedNumToClaim = null

  if (reward.numToClaim) {
    const parsedNumToClaim = parseNumIntoReadableString({
      num: reward.numToClaim,
      units: decimalUnits,
      minValue: '0',
      maxValue: '9999'
    })
    formattedNumToClaim = `+${parsedNumToClaim}`
  }

  return (
    <div className={styles.container} key={reward.name}>
      <div className={styles.rewardImageContainer}>
        {reward.isClaimed ? (
          <div className={styles.isClaimed}>{i18n.claimed}</div>
        ) : null}
        {reward.marketplace_url ? (
          <a
            href={reward.marketplace_url}
            className={styles.viewRewardContainer}
            rel="nooepner noreferrer"
            target="_blank"
          >
            <LinkExternal className={styles.linkExternalIcon} />
            {i18n.viewReward}
          </a>
        ) : null}
        <img src={reward.image_url} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={classNames('title-sm', styles.title)}>
            {formattedNumToClaim
              ? `${formattedNumToClaim} ${reward.name}`
              : reward.name}
          </div>
          {numClaimsLeftComponent}
        </div>
        {!reward.isClaimed ? (
          <Button
            disabled={reward.claimPending}
            onClick={() => onClaim(reward)}
            type="secondaryGradient"
            size="small"
            htmlType="button"
            className={styles.claimButton}
          >
            {reward.claimPending ? (
              <Loading className={styles.spinner} />
            ) : (
              i18n.claim
            )}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
