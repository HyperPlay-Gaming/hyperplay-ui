import React, { HTMLProps } from 'react'

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

export interface RewardProps extends HTMLProps<HTMLDivElement> {
  reward: QuestReward
  onClaim: () => void
  hideClaim?: boolean
  i18n?: {
    claimsLeft: string
    viewReward: string
    claimed: string
    claim: string
  }
}

export function Reward({
  reward,
  i18n = {
    claimsLeft: 'Claims left',
    viewReward: 'View Reward',
    claimed: 'Claimed',
    claim: 'Claim'
  },
  className,
  onClaim,
  ...props
}: RewardProps) {
  let numClaimsLeftComponent = null

  if (reward.numOfClaimsLeft) {
    const formattedNumOfClaimsLeft = parseNumIntoReadableString({
      num: reward.numOfClaimsLeft,
      units: decimalUnits,
      minValue: '0',
      maxValue: '9999'
    })

    const emptyClaims = Number(reward.numOfClaimsLeft) === 0

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
    <div
      className={classNames(styles.container, className)}
      key={reward.title}
      {...props}
    >
      <div className={styles.rewardImageContainer}>
        {reward.isClaimed ? (
          <div className={styles.isClaimed}>{i18n.claimed}</div>
        ) : null}
        {reward.marketplaceUrl ? (
          <a
            href={reward.marketplaceUrl}
            className={styles.viewRewardContainer}
            rel="nooepner noreferrer"
            target="_blank"
          >
            <LinkExternal className={styles.linkExternalIcon} />
            {i18n.viewReward}
          </a>
        ) : null}
        <img src={reward.imageUrl} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={classNames('title-sm', styles.title)}>
            {formattedNumToClaim
              ? `${formattedNumToClaim} ${reward.title}`
              : reward.title}
          </div>
          {numClaimsLeftComponent}
        </div>
        {!reward.isClaimed && !hideClaim ? (
          <Button
            disabled={reward.claimPending}
            onClick={onClaim}
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
