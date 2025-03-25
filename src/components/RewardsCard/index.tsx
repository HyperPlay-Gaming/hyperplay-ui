import React from 'react'

import { DotIcon } from '@/assets/images'

import { CardGeneric } from '../CardGeneric'
import Sticker from '../Sticker'
import styles from './index.module.scss'

export interface RewardsCardProps {
  reward: string
  rewardImage: string
  claimsLeft?: string | number
  i18n?: {
    claimsLabel?: string
    claimsLeftLabel?: string
  }
}

function RewardsCard({
  rewardImage,
  reward,
  claimsLeft,
  i18n = {
    claimsLabel: 'Claims left',
    claimsLeftLabel: 'Unlimited'
  }
}: RewardsCardProps) {
  return (
    <CardGeneric
      image={rewardImage}
      genericClassNames={{ body: styles.rewardsCard }}
      className={styles.cardBase}
    >
      <div className={styles.content}>
        <div className={styles.stickers}>
          <Sticker styleType="neutral" dimension="default">
            {reward}
          </Sticker>
          <Sticker
            styleType="neutral"
            dimension="default"
            withDot={{ dotColor: 'success', dotIcon: DotIcon }}
          >
            {i18n.claimsLabel}: {claimsLeft ?? i18n.claimsLeftLabel}
          </Sticker>
        </div>
      </div>
    </CardGeneric>
  )
}

export default RewardsCard
