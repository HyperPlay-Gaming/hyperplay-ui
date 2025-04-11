import { DotIcon } from '@/assets/images'
import {
  decimalUnits,
  getDecimalNumberFromAmount,
  parseNumIntoReadableString
} from '@hyperplay/utils'

import { CardGeneric } from '../CardGeneric'
import Sticker from '../Sticker'
import styles from './index.module.scss'

export type RewardsCardProps = {
  id: number
  questId: number
  rewardImage: string
  rewardType: string
  decimals?: number | null
  claimsLeft?: string | null
  rewardName: string
  amountPerUser: string | null
  i18n?: {
    claimsLabel?: string
  }
  isLoading?: boolean
}

function RewardsCard({
  rewardImage,
  rewardType,
  claimsLeft,
  decimals,
  i18n = {
    claimsLabel: 'Claims left'
  },
  isLoading = false,
  rewardName,
  amountPerUser
}: RewardsCardProps) {
  let rewardText = rewardName
  if (decimals === undefined || decimals === null) {
    decimals = 0
  }

  if (amountPerUser) {
    let numToClaim = undefined
    if (amountPerUser && decimals !== undefined && decimals !== null) {
      numToClaim = getDecimalNumberFromAmount(
        amountPerUser,
        decimals
      ).toString()
    } else {
      numToClaim = parseNumIntoReadableString({
        num: amountPerUser,
        units: decimalUnits,
        minValue: '1',
        maxValue: '9999'
      })
    }
    const parsedNumToClaim = parseNumIntoReadableString({
      num: numToClaim,
      units: decimalUnits,
      minValue: '0.0001',
      maxValue: '9999'
    })
    if (rewardType === 'ERC721' || rewardType === 'ERC20') {
      rewardText = rewardName
    } else {
      rewardText = `+${parsedNumToClaim} ${rewardName}`
    }
  }

  return (
    <CardGeneric
      image={rewardImage}
      genericClassNames={{
        root: isLoading ? styles.loading : '',
        image: styles.rewardImage,
        body: isLoading ? styles.loading : styles.rewardsBody
      }}
      className={styles.cardBase}
    >
      <div className={styles.content}>
        <div className={styles.stickers}>
          {isLoading || !rewardText ? null : (
            <Sticker
              styleType="neutral"
              dimension="default"
              variant="filledStrong"
            >
              {rewardText}
            </Sticker>
          )}
          {claimsLeft !== undefined && claimsLeft !== null && !isLoading ? (
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
