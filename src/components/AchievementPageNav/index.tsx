import React, { MouseEventHandler } from 'react'

import * as Images from '@/assets/images'

import CircularButton from '../CircularButton'
import styles from './AchievementPageNav.module.scss'

export interface AchievementPageProps {
  /**
   * Amount of free mints the user has
   */
  freeMints: number
  /**
   * Amount in the user's basket
   */
  basketAmount: number
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
}

export default function AchievementPageNav({
  freeMints,
  basketAmount,
  handlePrevious,
  handleNext,
  freeMintsLabel = 'Free mints'
}: AchievementPageProps) {
  return (
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
        <div className="text--md">
          {freeMintsLabel}:{' '}
          <span className="weight--semibold">{freeMints}</span>
        </div>
        <div className={styles.basket}>
          <Images.TrophyOutline width="22" height="22" />
          <div className={styles.badge}>{basketAmount}</div>
        </div>
      </div>
    </div>
  )
}
