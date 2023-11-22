import React, { HTMLProps } from 'react'

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
import Loading from '../Loading'
import CustomImage from '../Image'
import styles from './GameAchievements.module.scss'

export interface GameAchievementsProps
  extends HTMLProps<HTMLDivElement>,
    AchievementProgressProps {
  /**
   * Game data
   */
  game: {
    title: string
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
  mintButtonProps?: ButtonProps & { totalToMint: number }
  updateButtonProps?: ButtonProps & { totalToUpdate: number }
  sortProps: DropdownProps
  paginationProps: {
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
    updateButtonLabel?: string
  }
  loadingAchievements?: boolean
  gameCardImage: string
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
  updateButtonProps,
  i18n = {
    lockedLabel: 'Locked',
    unLockedLabel: 'Unlocked',
    achievementsTitleLabel: 'Achievements',
    mintButtonLabel: 'Mint',
    updateButtonLabel: 'Update'
  },
  loadingAchievements,
  gameCardImage,
  ...rest
}: GameAchievementsProps) {
  const { safeMintedCount, safeTotalCount, mintedProgress, mintableProgress } =
    getProgress({
      mintedAchievementsCount,
      totalAchievementsCount,
      mintableAchievementsCount
    })
  const { handleNextPage, handlePrevPage } = paginationProps
  const { totalToMint, ...mintProps } = mintButtonProps ?? {}
  const { totalToUpdate, ...updateProps } = updateButtonProps ?? {}

  return (
    <div className={styles.container} {...rest}>
      <div className={styles.hero}>
        <AchievementNav
          {...achievementNavProps}
          nextButtonProps={{
            onClick: handleNextPage
          }}
          previousButtonProps={{
            onClick: handlePrevPage
          }}
          showPreviousButton={true}
          showGameAddButton={true}
        />

        <div className={cn(styles.row, styles.ctaContainer)}>
          <Button
            type="secondary"
            size="medium"
            spacing="xs"
            rightIcon={
              <div className={cn(styles.rightIcon, styles.mint)}>
                {totalToMint ?? 0}
              </div>
            }
            {...mintProps}
          >
            {i18n.mintButtonLabel}
          </Button>
          <Button
            type="alert"
            size="medium"
            leftIcon={<Images.Update width={16} height={16} />}
            spacing="xs"
            rightIcon={
              <div className={cn(styles.rightIcon, styles.update)}>
                {totalToUpdate ?? 0}
              </div>
            }
            {...updateProps}
          >
            {i18n.updateButtonLabel}
          </Button>
        </div>

        <div className={styles.heroRow}>
          <div>
            <Image
              src={gameCardImage}
              w={300}
              className={styles.gameCardImageContainer}
            />
          </div>

          <div className={styles.progress}>
            <h6 className={styles.title}>{game.title}</h6>
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
          {loadingAchievements ? (
            <Loading />
          ) : (
            achievements.map(({ id, title, description, image, isLocked }) => (
              <div
                key={id}
                className={cn(styles.row, isLocked ? styles.locked : '')}
              >
                <div className={styles.achievementData}>
                  <CustomImage
                    className={styles.image}
                    src={image}
                    h={80}
                    w={80}
                    placeholder={<div className={styles.fallback} />}
                    style={{ 
                      height: 80,
                      width: 80,
                    }}
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}
