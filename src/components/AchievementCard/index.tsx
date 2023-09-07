import { Card, Image, ImageProps, Progress } from '@mantine/core'
import classNames from 'classnames'

import FallbackImage from '@/assets/fallback_card.jpg?url'
import * as Images from '@/assets/images'

import Button, { ButtonProps } from '../Button'
import styles from './AchievementCard.module.scss'

interface AchievementCardProps {
  image: string
  title: string
  /**
   * The number of achievements that have been minted by the user for this game
   */
  mintedAchievementsCount: number
  /**
   * The total number of achievements that exist for this game
   */
  totalAchievementsCount: number
  /**
   * Props to pass to the image component
   */
  imageProps?: ImageProps
  /**
   * Props to pass to the CTA button
   */
  ctaProps?: ButtonProps
  /**
   * If true, the card will have a new achievement indicator
   */
  isNewAchievement?: boolean
  /**
   * The label to display for the new achievement indicator
   */
  newAchievementLabel?: string
}

export default function AchievementCard({
  image,
  title,
  imageProps = {},
  ctaProps = {},
  mintedAchievementsCount,
  totalAchievementsCount,
  isNewAchievement = false,
  newAchievementLabel = 'New Achievement',
  ...others
}: AchievementCardProps &
  ImageProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof AchievementCardProps>) {
  const safeMintedCount = Math.min(
    mintedAchievementsCount,
    totalAchievementsCount
  )
  const safeTotalCount = totalAchievementsCount ?? 0

  // Calculate the percentage of achievements that have been minted
  const mintedProgress = Math.round((safeMintedCount / safeTotalCount) * 100)

  return (
    <Card radius="md" pos="relative" bg="var(--color-neutral-700)" {...others}>
      <Card.Section pos="relative">
        <Image
          src={image}
          height={180}
          bg="var(--color-gradient-08)"
          withPlaceholder
          placeholder={<Image src={FallbackImage} height={180} />}
          {...imageProps}
        />
        {isNewAchievement && (
          <div className={styles.newAchievement}>{newAchievementLabel}</div>
        )}
      </Card.Section>

      <Button
        size="icon"
        type="secondary"
        {...ctaProps}
        className={classNames(styles.addButton, ctaProps.className)}
      >
        <Images.PlusCircleOutline fill="white" height={24} width={24} />
      </Button>

      <div className={styles.cardBody}>
        <div className="body">{title}</div>

        <div className={styles.achievements}>
          <div className={styles.column}>
            <div className={styles.textContainer}>
              <div>{safeMintedCount}</div>
              <div>/</div>
              <div>{safeTotalCount}</div>
              <div>achievements minted</div>
            </div>
            <Progress
              bg="var(--color-neutral-600)"
              sections={[
                {
                  value: mintedProgress,
                  color: 'var(--color-success-400)'
                }
              ]}
            />
          </div>
          <div className={styles.icon}>
            <Images.Info
              height={16}
              width={16}
              fill="var(--color-neutral-400)"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
