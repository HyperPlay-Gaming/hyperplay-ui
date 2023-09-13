import { Card, Image, ImageProps, Popover, Progress } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import cn from 'classnames'

import FallbackImage from '@/assets/fallback_achievement.jpg?url'
import * as Images from '@/assets/images'

import { ButtonProps } from '../Button'
import CircularButton from '../CircularButton'
import styles from './AchievementCard.module.scss'

interface AchievementCardProps {
  image: string
  title: string
  infoText: string
  /**
   * The total number of achievements that a user is able to mint for this game
   */
  mintableAchievementsCount: number
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
  mintableAchievementsCount,
  isNewAchievement = false,
  newAchievementLabel = 'New Achievement',
  infoText,
  ...others
}: AchievementCardProps &
  ImageProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof AchievementCardProps>) {
  const [opened, { close, open }] = useDisclosure(false)

  const safeMintedCount = mintedAchievementsCount || 0
  const safeTotalCount = totalAchievementsCount > 0 ? totalAchievementsCount : 0

  const mintedProgress =
    safeTotalCount > 0
      ? Math.round((mintedAchievementsCount / safeTotalCount) * 100)
      : 0
  const mintableProgress =
    safeTotalCount > 0
      ? Math.round(
          (mintableAchievementsCount / safeTotalCount) * 100 - mintedProgress
        )
      : 0

  return (
    <Card
      radius="md"
      pos="relative"
      bg="var(--color-neutral-700)"
      w="100%"
      padding={0}
      className={cn(styles.card, others.className)}
      {...others}
    >
      <Card.Section pos="relative" className={styles.image}>
        <Image
          src={image}
          height={180}
          bg="var(--color-gradient-08)"
          withPlaceholder
          placeholder={<Image src={FallbackImage} height={180} />}
          {...imageProps}
        />
        {isNewAchievement && (
          <div className={cn(styles.newAchievement, 'eyebrow')}>
            {newAchievementLabel}
          </div>
        )}
      </Card.Section>

      <CircularButton
        {...ctaProps}
        className={cn(styles.addButton, ctaProps.className)}
      >
        <Images.PlusCircleOutline
          fill="var(--colors-neutral-100)"
          height={24}
          width={24}
        />
      </CircularButton>

      <div className={styles.cardBody}>
        <div className={cn(styles.title, 'body')}>{title}</div>

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
                },
                {
                  value: mintableProgress,
                  color: 'var(--color-success-400-20)'
                }
              ]}
            />
          </div>
          <div className={styles.icon}>
            <Popover width={200} shadow="md" opened={opened}>
              <Popover.Target>
                <button
                  onMouseEnter={open}
                  onMouseLeave={close}
                  className={styles.popoverButton}
                >
                  <Images.Info
                    height={16}
                    width={16}
                    fill="var(--color-neutral-400)"
                  />
                </button>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="caption-sm">{infoText}</div>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </div>
    </Card>
  )
}
