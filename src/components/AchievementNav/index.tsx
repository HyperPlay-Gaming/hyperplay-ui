import React from 'react'

import classNames from 'classnames'

import * as Images from '@/assets/images'

import CircularButton, { CircularButtonProps } from '../CircularButton'
import styles from './AchievementNav.module.scss'

export interface AchievementNavProps {
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
  i18n?: {
    /**
     * text to show how many free mints a user has
     */
    freeMintsLabel?: string
  }
  showPreviousButton?: boolean
  showNextButton?: boolean
}

export default function AchievementNav({
  freeMints,
  basketAmount,
  previousButtonProps,
  nextButtonProps,
  i18n = {
    freeMintsLabel: 'Free mints'
  },
  showPreviousButton = false,
  showNextButton = false
}: AchievementNavProps) {
  return (
    <div className={styles.row}>
      <div className={styles.left}>
        {showPreviousButton ? (
          <CircularButton
            {...previousButtonProps}
            className={classNames(
              previousButtonProps?.className,
              styles.navItem
            )}
          >
            <Images.ChevronLeft width="16" height="16" />
          </CircularButton>
        ) : null}
        {showNextButton ? (
          <CircularButton
            {...nextButtonProps}
            className={classNames(
              previousButtonProps?.className,
              styles.navItem
            )}
          >
            <Images.ChevronRight width="16" height="16" />
          </CircularButton>
        ) : null}
      </div>

      <div className={styles.right}>
        <div className="text--md">
          {i18n.freeMintsLabel}:{' '}
          <span className="weight--semibold">{freeMints}</span>
        </div>
        <div className={styles.basket}>
          <Images.TrophyOutline width="22" height="22" />
          <div className={classNames(styles.badge, 'menu')}>{basketAmount}</div>
        </div>
      </div>
    </div>
  )
}
