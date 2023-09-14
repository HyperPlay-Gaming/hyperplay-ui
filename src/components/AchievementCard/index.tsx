import { Card, Image, ImageProps, Popover, Progress } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import cn from 'classnames'

import FallbackImage from '@/assets/fallback_achievement.svg?url'
import * as Images from '@/assets/images'

import { ButtonProps } from '../Button'
import styles from './AchievementCard.module.scss'
import StatusIcon, { StatusIconState } from './components/StatusIcon'

interface AchievementCardProps {
  image: string
  title: string
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
  /**
   * State of card
   */
  state?: StatusIconState
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
  state = 'default',
  ...rest
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
      className={cn(styles.card, rest.className)}
      {...rest}
    >
      <Card.Section
        pos="relative"
        className={cn(styles.image, styles.mantineOverRide)}
      >
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

      <StatusIcon
        {...ctaProps}
        state={state}
        className={cn(ctaProps.className, styles.addButton)}
      />

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
              <Popover.Dropdown className={styles.popover}>
                <div className="text--sm color-neutral-400">
                  Achievement progress
                </div>
                <div className={styles.popoverRow}>
                  <div className={cn(styles.circle, styles.minted)} />
                  <div className="text--xs color-neutral-100">{`${safeMintedCount} minted`}</div>
                </div>
                <div className={styles.popoverRow}>
                  <div className={cn(styles.circle, styles.notMinted)} />
                  <div className="text--xs color-neutral-100">{`${
                    safeTotalCount > safeMintedCount
                      ? safeTotalCount - safeMintedCount
                      : 0
                  } not minted`}</div>
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </div>
    </Card>
  )
}
