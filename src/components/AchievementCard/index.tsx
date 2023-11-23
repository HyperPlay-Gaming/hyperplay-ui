import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

import { Card, CardProps, ImageProps, Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import cn from 'classnames'

import FallbackImage from '@/assets/fallback_achievement.svg?url'
import * as Images from '@/assets/images'

import AchievementProgress, {
  AchievementProgressTextProps
} from '../AchievementProgress'
import ProgressKey, {
  ProgressKeyTextProps
} from '../AchievementProgress/components/ProgressKey'
import getProgress from '../AchievementProgress/helpers/getProgress'
import { ButtonProps } from '../Button'
import CustomImage from '../Image'
import styles from './AchievementCard.module.scss'
import StatusIcon, { StatusIconState } from './components/StatusIcon'

export interface AchievementCardProps extends CardProps {
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
  imageProps?: ImageProps &
    Omit<
      DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      'ref'
    >
  /**
   * Props to pass to the CTA button
   */
  ctaProps?: ButtonProps
  /**
   * If true, the card will have a new achievement indicator
   */
  isNewAchievement?: boolean
  /**
   * State of card
   */
  state?: StatusIconState
  progressKeyProps?: ProgressKeyTextProps
  achievementProgressProps?: AchievementProgressTextProps
  i18n?: {
    /**
     * The label to display title for the info popover
     */
    achievementInfoTitleLabel?: string
    /**
     * The label to display for the new achievement indicator
     */
    newAchievementLabel?: string
  }
  showStatusIcon?: boolean
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
  state = 'default',
  i18n = {
    newAchievementLabel: 'New Achievement',
    achievementInfoTitleLabel: 'Achievement progress'
  },
  progressKeyProps,
  achievementProgressProps,
  showStatusIcon = true,
  ...rest
}: AchievementCardProps &
  ImageProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof AchievementCardProps>) {
  const [opened, { close, open }] = useDisclosure(false)
  const { safeMintedCount, safeTotalCount, mintedProgress, mintableProgress } =
    getProgress({
      mintedAchievementsCount,
      totalAchievementsCount,
      mintableAchievementsCount
    })

  let statusIcon = null
  if (showStatusIcon) {
    statusIcon = (
      <StatusIcon
        {...ctaProps}
        state={state}
        className={cn(ctaProps.className, styles.addButton)}
      />
    )
  }

  const infoIcon = (
    <div className={styles.icon}>
      <Popover width={200} shadow="md" opened={opened} position="top">
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
            {i18n.achievementInfoTitleLabel}
          </div>
          <div className={styles.popoverRow}>
            <ProgressKey
              safeMintedCount={safeMintedCount}
              safeTotalCount={safeTotalCount}
              direction="column"
              {...progressKeyProps}
            />
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  )

  return (
    <Card
      radius="md"
      pos="relative"
      display={'inline-block'}
      padding={0}
      bg="transparent"
      className={cn(
        styles.card,
        rest.className,
        'gradientShadow',
        'gradientBorderOnHover'
      )}
      {...rest}
    >
      <Card.Section
        pos="relative"
        className={cn(styles.image, styles.mantineOverRide)}
      >
        <CustomImage
          src={image}
          w={300}
          bg="var(--color-gradient-08)"
          fallbackSrc={FallbackImage}
          {...imageProps}
        />
        {isNewAchievement && (
          <div className={cn(styles.newAchievement, 'eyebrow')}>
            {i18n.newAchievementLabel}
          </div>
        )}
      </Card.Section>

      {statusIcon}

      <div className={styles.cardBody}>
        <div className={cn(styles.title, 'body')}>{title}</div>

        <div className={styles.achievements}>
          <div className={styles.column}>
            <AchievementProgress
              safeMintedCount={safeMintedCount}
              safeTotalCount={safeTotalCount}
              mintedProgress={mintedProgress}
              mintableProgress={mintableProgress}
              rightIcon={infoIcon}
              {...achievementProgressProps}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
