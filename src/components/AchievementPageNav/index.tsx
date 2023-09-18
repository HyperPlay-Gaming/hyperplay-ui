import React from 'react'

import classNames from 'classnames'

import * as Images from '@/assets/images'

import CircularButton, { CircularButtonProps } from '../CircularButton'
import styles from './AchievementPageNav.module.scss'

export interface AchievementPageNavProps {
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
  nextButtonProps?: CircularButtonProps
  /**
   * Go to previous game
   */
  previousButtonProps?: CircularButtonProps
  /**
   * text to show how many free mints a user has
   */
  freeMintsLabel?: string
}

export default function AchievementPageNav({
  freeMints,
  basketAmount,
  previousButtonProps,
  nextButtonProps,
  freeMintsLabel = 'Free mints'
}: AchievementPageNavProps) {
  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <CircularButton
          {...previousButtonProps}
          className={classNames(previousButtonProps?.className, styles.navItem)}
        >
          <Images.ChevronLeft width="16" height="16" />
        </CircularButton>
        <CircularButton
          {...nextButtonProps}
          className={classNames(previousButtonProps?.className, styles.navItem)}
        >
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
