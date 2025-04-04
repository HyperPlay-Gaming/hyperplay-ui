import { DotIcon } from '@/assets/images'

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
}

function RewardsCard({
  rewardImage,
  reward,
  claimsLeft,
  i18n = {
    claimsLabel: 'Claims left'
  }
}: RewardsCardProps) {
  return (
    <CardGeneric
      image={rewardImage}
      showGradientBorderAndShadow
      genericClassNames={{
        body: styles.rewardsCard,
        image: styles.rewardImage
      }}
      className={styles.cardBase}
    >
      <div className={styles.content}>
        <div className={styles.stickers}>
          <Sticker
            styleType="neutral"
            dimension="default"
            variant="filledStrong"
          >
            {reward}
          </Sticker>
          {claimsLeft !== undefined ? (
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
