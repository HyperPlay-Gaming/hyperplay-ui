import React, { HTMLProps, MouseEventHandler, useState } from 'react'

import { Image } from '@mantine/core'
import cn from 'classnames'

import * as Images from '@/assets/images'

import AchievementProgress from '../AchievementProgress'
import ProgressKey from '../AchievementProgress/components/ProgressKey'
import getProgress, {
  AchievementProgressProps
} from '../AchievementProgress/helpers/getProgress'
import CircularButton from '../CircularButton'
import { Dropdown } from '../Dropdowns'
import { itemType } from '../Dropdowns/Dropdown'
import styles from './GameAchievements.module.scss'
import Basket from './components/Basket'

export interface GameAchievementsProps
  extends HTMLProps<HTMLDivElement>,
    AchievementProgressProps {
  /**
   * Amount of free mints the user has
   */
  freeMints: number
  /**
   * Amount in the user's basket
   */
  basketAmount: number
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
   * Go to next game
   */
  handleNext?: MouseEventHandler<HTMLButtonElement> | undefined
  /**
   * Go to previous game
   */
  handlePrevious?: MouseEventHandler<HTMLButtonElement> | undefined
  /**
   * text to show how many free mints a user has
   */
  freeMintsLabel?: string
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
}

export default function GameAchievements({
  freeMints,
  basketAmount,
  game,
  mintedAchievementsCount,
  totalAchievementsCount,
  mintableAchievementsCount,
  handlePrevious,
  handleNext,
  freeMintsLabel = 'Free mints',
  lockedLabel = 'locked',
  unLockedLabel = 'Unlocked',
  achievementsTitleLabel = 'Achievements',
  sortOptions = [
    { text: 'Alphabetically' },
    { text: 'Favorites' },
    { text: 'Sort by Status' }
  ],
  ...rest
}: GameAchievementsProps) {
  const [selected, setSelected] = useState(sortOptions[0])
  const { safeMintedCount, safeTotalCount, mintedProgress, mintableProgress } =
    getProgress({
      mintedAchievementsCount,
      totalAchievementsCount,
      mintableAchievementsCount
    })

  return (
    <div className={styles.container} {...rest}>
      <div className={styles.hero}>
        <Images.MobileHpLogo className={styles.logo} width={100} height={100} />
        <div className={styles.row}>
          <div className={styles.left}>
            <CircularButton onClick={handlePrevious} className={styles.navItem}>
              <Images.ChevronLeft width="16" height="16" />
            </CircularButton>
            <CircularButton onClick={handleNext} className={styles.navItem}>
              <Images.ChevronRight width="16" height="16" />
            </CircularButton>
          </div>

          <div className={styles.right}>
            <p className="text--md">
              {freeMintsLabel}:{' '}
              <span className="weight--semibold">{freeMints}</span>
            </p>
            <Basket amount={basketAmount} />
          </div>
        </div>

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
            />
            <ProgressKey
              className={styles.progressKey}
              safeMintedCount={safeMintedCount}
              safeTotalCount={safeTotalCount}
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
          {game.achievements.map(
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
