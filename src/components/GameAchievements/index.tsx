import React, { HTMLProps, useMemo, useState } from 'react'

import { Image } from '@mantine/core'
import cn from 'classnames'

import * as Images from '@/assets/images'

import AchievementPageNav, { AchievementPageProps } from '../AchievementPageNav'
import AchievementProgress, {
  AchievementProgressTextProps
} from '../AchievementProgress'
import ProgressKey, {
  ProgressKeyTextProps
} from '../AchievementProgress/components/ProgressKey'
import getProgress, {
  AchievementProgressProps
} from '../AchievementProgress/helpers/getProgress'
import { Dropdown } from '../Dropdowns'
import { itemType } from '../Dropdowns/Dropdown'
import styles from './GameAchievements.module.scss'

export interface GameAchievementsProps
  extends HTMLProps<HTMLDivElement>,
    AchievementProgressProps,
    AchievementPageProps {
  /**
   * Game data
   */
  game: {
    title: string
    tags: string[]
    achievements: {
      id: string
      title: string
      description: string
      image: string
      isLocked: boolean
    }[]
  }
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
  /**
   * list of options for the dropdown to sort your achievements
   */
  sortOptions?: itemType[]
  progressKeyProps?: ProgressKeyTextProps
  achievementProgressProps?: AchievementProgressTextProps
}

const achievementsSortOptions = [
  { id: 'alphabetically', text: 'Alphabetically' },
  { id: 'favorites', text: 'Favorites' },
  { id: 'status', text: 'Sort by Status' }
] as itemType[]

export default function GameAchievements({
  freeMints,
  basketAmount,
  game,
  mintedAchievementsCount,
  totalAchievementsCount,
  mintableAchievementsCount,
  handlePrevious,
  handleNext,
  freeMintsLabel,
  lockedLabel = 'locked',
  unLockedLabel = 'Unlocked',
  achievementsTitleLabel = 'Achievements',
  sortOptions = achievementsSortOptions,
  achievementProgressProps,
  progressKeyProps,
  ...rest
}: GameAchievementsProps) {
  const [selected, setSelected] = useState(sortOptions[0])
  const { safeMintedCount, safeTotalCount, mintedProgress, mintableProgress } =
    getProgress({
      mintedAchievementsCount,
      totalAchievementsCount,
      mintableAchievementsCount
    })

  const sortedAchievements = useMemo(() => {
    if (selected.id === 'alphabetically') {
      return game.achievements.sort((a, b) => a.title.localeCompare(b.title))
    }
    return game.achievements
  }, [selected.text, game.achievements])

  return (
    <div className={styles.container} {...rest}>
      <div className={styles.hero}>
        <Images.MobileHpLogo className={styles.logo} width={100} height={100} />
        <AchievementPageNav
          freeMints={freeMints}
          basketAmount={basketAmount}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          freeMintsLabel={freeMintsLabel}
        />

        <div className={styles.row}>
          <div>
            <p
              className="text--4xl"
              style={{ fontFamily: 'var(--primary-font-family)' }}
            >
              {game.title}
            </p>
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
            {achievementsTitleLabel}
          </div>

          <Dropdown
            options={sortOptions}
            onItemChange={setSelected}
            selected={selected}
            targetWidth="300"
            dropdownButtonDivProps={{
              className: 'title-sm'
            }}
          />
        </div>

        <div className={styles.list}>
          {sortedAchievements.map(
            ({ id, title, description, image, isLocked }) => (
              <div key={id} className={styles.row}>
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
                    <div className={styles.locked}>{lockedLabel}</div>
                  ) : (
                    <div className={styles.unlocked}>
                      <div>{unLockedLabel}</div>
                      <Images.CheckmarkCircleOutline
                        fill="var(--color-neutral-400)"
                        width={21}
                        height={21}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
