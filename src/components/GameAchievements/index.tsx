import React, { HTMLProps } from 'react'

import { Image } from '@mantine/core'
import cn from 'classnames'

import * as Images from '@/assets/images'

import AchievementNav, { AchievementNavProps } from '../AchievementNav'
import AchievementProgress, {
  AchievementProgressTextProps
} from '../AchievementProgress'
import ProgressKey, {
  ProgressKeyTextProps
} from '../AchievementProgress/components/ProgressKey'
import getProgress, {
  AchievementProgressProps
} from '../AchievementProgress/helpers/getProgress'
import Button, { ButtonProps } from '../Button'
import { Dropdown } from '../Dropdowns'
import { DropdownProps } from '../Dropdowns/Dropdown'
import styles from './GameAchievements.module.scss'

export interface GameAchievementsProps
  extends HTMLProps<HTMLDivElement>,
    AchievementProgressProps {
  /**
   * Game data
   */
  game: {
    title: string
    tags: string[]
  }
  /**
   * An array of achievements
   */
  achievements: {
    id: string
    title: string
    description: string
    image: string
    isLocked: boolean
  }[]
  progressKeyProps?: ProgressKeyTextProps
  achievementProgressProps?: AchievementProgressTextProps
  achievementNavProps: AchievementNavProps
  mintButtonProps?: ButtonProps
  sortProps: DropdownProps
  paginationProps: {
    currentPage: number
    totalPages: number
    handleNextPage: () => void
    handlePrevPage: () => void
  }
  i18n?: {
    /**
     * text to show the achievement is locked
     */
    lockedLabel?: string
    /**
     * text to show the achievement is unlocked
     */
    unLockedLabel?: string
    /**
     * title of the Achievements list
     */
    achievementsTitleLabel?: string
    mintButtonLabel?: string
  }
}

export default function GameAchievements({
  game,
  mintedAchievementsCount,
  totalAchievementsCount,
  mintableAchievementsCount,
  achievementNavProps,
  progressKeyProps,
  achievements,
  sortProps,
  paginationProps,
  achievementProgressProps,
  mintButtonProps,
  i18n = {
    lockedLabel: 'Locked',
    unLockedLabel: 'Unlocked',
    achievementsTitleLabel: 'Achievements',
    mintButtonLabel: 'Mint'
  },
  ...rest
}: GameAchievementsProps) {
  const { safeMintedCount, safeTotalCount, mintedProgress, mintableProgress } =
    getProgress({
      mintedAchievementsCount,
      totalAchievementsCount,
      mintableAchievementsCount
    })
  const { handleNextPage, handlePrevPage, currentPage, totalPages } =
    paginationProps

  return (
    <div className={styles.container} {...rest}>
      <div className={styles.hero}>
        <Images.MobileHpLogo className={styles.logo} width={100} height={100} />
        <AchievementNav
          {...achievementNavProps}
          nextButtonProps={{
            onClick: handleNextPage,
            disabled: currentPage === totalPages
          }}
          previousButtonProps={{
            onClick: handlePrevPage,
            disabled: currentPage === 1
          }}
        />

        <div className={cn(styles.row, styles.ctaContainer)}>
          <Button
            type="secondary"
            size="medium"
            leftIcon={<Images.PlusCircleOutline width={16} height={16} />}
            spacing="xs"
            {...mintButtonProps}
            className={cn(styles.mintButton, mintButtonProps?.className)}
          >
            {i18n.mintButtonLabel}
          </Button>
        </div>

        <div className={styles.row}>
          <div>
            <h6 className={styles.title}>{game.title}</h6>
            <div className={styles.tagList}>
              {game.tags.map((tag) => (
                <div
                  key={tag}
                  className={cn(styles.tag, styles.colorNeutral400, 'text--xs')}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.progress}>
            <AchievementProgress
              safeMintedCount={safeMintedCount}
              safeTotalCount={safeTotalCount}
              mintedProgress={mintedProgress}
              mintableProgress={mintableProgress}
              {...achievementProgressProps}
            />
            <ProgressKey
              className={styles.progressKey}
              safeMintedCount={safeMintedCount}
              safeTotalCount={safeTotalCount}
              {...progressKeyProps}
            />
          </div>
        </div>
      </div>

      <div className={styles.achievements}>
        <div className={styles.row}>
          <div
            className={cn(
              styles.colorNeutral400,
              'text--2xl',
              'weight--semibold'
            )}
            style={{ fontFamily: 'var(--primary-font-family)' }}
          >
            {i18n.achievementsTitleLabel}
          </div>

          <Dropdown
            targetWidth="300"
            dropdownButtonDivProps={{
              className: 'title-sm'
            }}
            {...sortProps}
          />
        </div>

        <div className={styles.list}>
          {achievements.map(({ id, title, description, image, isLocked }) => (
            <div
              key={id}
              className={cn(styles.row, isLocked ? styles.locked : '')}
            >
              <div className={styles.achievementData}>
                <Image
                  className={styles.image}
                  src={image}
                  height={80}
                  width={80}
                  withPlaceholder
                  placeholder={<div className={styles.fallback} />}
                />
                <div className={styles.achievementInfo}>
                  <div className="text--lg weight--medium">{title}</div>
                  <div className={cn(styles.colorNeutral400, 'text--md')}>
                    {description}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  styles.colorNeutral400,
                  styles.achievementState,
                  'text--sm'
                )}
              >
                {isLocked ? (
                  <div>{i18n.lockedLabel}</div>
                ) : (
                  <div className={styles.unlocked}>
                    <div>{i18n.unLockedLabel}</div>
                    <Images.CheckmarkCircleOutline width={21} height={21} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
