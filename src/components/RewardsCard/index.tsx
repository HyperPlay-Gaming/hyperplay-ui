import { DotIcon } from '@/assets/images'
import { decimalUnits, parseNumIntoReadableString } from '@hyperplay/utils'

import { CardGeneric } from '../CardGeneric'
import Sticker from '../Sticker'
import styles from './index.module.scss'

export type RewardsCardProps = {
  id: number
  questId: number
  reward: string
  rewardImage: string
  claimsLeft?: string
  i18n?: {
    claimsLabel?: string
  }
  isLoading?: boolean
}

function RewardsCard({
  rewardImage,
  reward,
  claimsLeft,
  i18n = {
    claimsLabel: 'Claims left'
  },
  isLoading = false
}: RewardsCardProps) {
  const formatedReward = reward.match(/(?<=\+)\d+/)?.[0] || '0'
  const rewardName = reward.match(/(?<=\s)[a-zA-Z\s]+/)?.[0] || ''

  const formatedAmount = parseNumIntoReadableString({
    num: formatedReward,
    units: decimalUnits,
    minValue: '1',
    maxValue: '9999'
  })

  reward = `+${formatedAmount} ${rewardName}`

  return (
    <CardGeneric
      image={rewardImage}
      genericClassNames={{
        body: isLoading ? styles.loading : styles.rewardsCard,
        image: styles.rewardImage,
        root: isLoading ? styles.loading : ''
      }}
      className={styles.cardBase}
    >
      <div className={styles.content}>
        <div className={styles.stickers}>
          {isLoading ? null : (
            <Sticker
              styleType="neutral"
              dimension="default"
              variant="filledStrong"
            >
              {reward}
            </Sticker>
          )}
          {claimsLeft !== undefined && !isLoading ? (
            <Sticker
              styleType="neutral"
              dimension="default"
              withDot={{ dotColor: 'success', dotIcon: DotIcon }}
            >
              {i18n.claimsLabel}: {claimsLeft}
            </Sticker>
          ) : null}
        </div>
      </div>
    </CardGeneric>
  )
}

export default RewardsCard
