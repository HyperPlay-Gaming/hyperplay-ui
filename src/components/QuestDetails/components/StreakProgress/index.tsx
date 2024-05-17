import React from 'react'

import classNames from 'classnames'

import { Clock, LightningBolt } from '@/assets/images'

import { PlayStreakEligibility } from '../../types'
import styles from './index.module.scss'

export interface StreakProgressI18n {
  streakProgress: string
  nextRewardIn: string
  days: string
  playToStart: string
}

export interface StreakProgressProps extends PlayStreakEligibility {
  i18n?: StreakProgressI18n
}

export default function StreakProgress({
  currentStreakInDays,
  requiredStreakInDays,
  i18n = {
    streakProgress: 'Streak Progress',
    nextRewardIn: 'Next reward in:',
    days: 'days',
    playToStart: 'Play this game to start your streak!'
  }
}: StreakProgressProps) {
  const timeLeftString = '00:00:00'
  const lightningBoltIcons = []
  if (requiredStreakInDays <= 24) {
    for (let i = 0; i < requiredStreakInDays; ++i) {
      lightningBoltIcons.push(i < currentStreakInDays)
    }
  }

  function getFilledClass(filled: boolean) {
    const filledClass: Record<string, boolean> = {}
    filledClass[styles.filled] = filled
    return filledClass
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.rewardCountdownContainer}>
        <Clock className={styles.clock} />
        {`${i18n.nextRewardIn} `}
        <em>{timeLeftString}</em>
      </div>
      <div className={styles.progressContainer}>
        <div>
          <div>{i18n.streakProgress}</div>
          <div className={classNames('title', styles.daysLeftText)}>
            <em>{`${currentStreakInDays}`}</em>
            {` / ${requiredStreakInDays} ${i18n.days}`}
          </div>
        </div>
        <div className={styles.progressIconsContainer}>
          {lightningBoltIcons.map((filled, index) => (
            <LightningBolt
              className={classNames(styles.streakIcons, getFilledClass(filled))}
              key={`lightningBolt:${index}`}
              stroke=""
            />
          ))}{' '}
          <LightningBolt />
        </div>
      </div>
      <hr></hr>
      <div className={styles.bottomContainer}>
        <LightningBolt className={styles.circleLightning} /> {i18n.playToStart}
      </div>
    </div>
  )
}
