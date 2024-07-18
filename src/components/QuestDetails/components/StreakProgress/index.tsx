import React, { useEffect, useState } from 'react'

import { RingProgress } from '@mantine/core'
import classNames from 'classnames'

import { Clock, LightningBolt } from '@/assets/images'

import { PlayStreakEligibility } from '../../types'
import styles from './index.module.scss'

export interface StreakProgressI18n {
  streakProgress: string
  dayResets: string
  days: string
  playToStart: string
  progressTowardsStreak: string
  playEachDay: string
  streakCompleted: string
  now: string
}

export interface StreakProgressProps extends PlayStreakEligibility {
  i18n?: StreakProgressI18n
}

export default function StreakProgress({
  currentStreakInDays,
  requiredStreakInDays,
  getResetTimeInMsSinceEpoch,
  dailySessionPercentCompleted,
  i18n = {
    streakProgress: 'Streak Progress',
    days: 'days',
    playToStart: 'Play this game to start your streak!',
    progressTowardsStreak: `progress towards today's streak.`,
    playEachDay: `Play each day so your streak won't reset!`,
    streakCompleted: 'Streak completed! Claim your rewards now.',
    now: 'Now',
    dayResets: 'Day resets:'
  }
}: StreakProgressProps) {
  const questStarted = !!currentStreakInDays
  const questFinished = currentStreakInDays >= requiredStreakInDays

  function getTimeLeftString() {
    const timeLeftInMs = getResetTimeInMsSinceEpoch() - Date.now().valueOf()
    if (timeLeftInMs <= 0) {
      return i18n.now
    }
    const ss = Math.floor(timeLeftInMs / 1000) % 60
    const mm = Math.floor(timeLeftInMs / 1000 / 60) % 60
    const hh = Math.floor(timeLeftInMs / 1000 / 60 / 60)
    const padWithZero = (xx: number) => String(xx).padStart(2, '0')
    return `${padWithZero(hh)}:${padWithZero(mm)}:${padWithZero(ss)}`
  }
  const [timeLeftString, setTimeLeftString] = useState(getTimeLeftString())

  function updateTimeLeft() {
    if (!questFinished) {
      setTimeLeftString(getTimeLeftString())
    }
  }

  useEffect(() => {
    const interval = setInterval(() => updateTimeLeft(), 1000)
    return () => clearInterval(interval)
  }, [])

  const lightningBoltIcons: boolean[] = []
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

  let rootColor = 'var(--color-neutral-600)'
  let lightningBoltCircleClass = ''
  let percentCompleted = 0
  let ctaText = i18n.playToStart
  if (questStarted) {
    percentCompleted = dailySessionPercentCompleted
    lightningBoltCircleClass = styles.inProgress
    ctaText = `${percentCompleted}% ${i18n.progressTowardsStreak} ${i18n.playEachDay}`
  }

  if (questFinished) {
    lightningBoltCircleClass = styles.finished
    rootColor = 'var(--color-success-300)'
    percentCompleted = 0
    ctaText = i18n.streakCompleted
  }

  let rewardCountdownContainer = null
  if (!questFinished) {
    rewardCountdownContainer = (
      <div className={classNames('caption', styles.rewardCountdownContainer)}>
        <Clock className={styles.clock} />
        {i18n.dayResets}
        <em>{timeLeftString}</em>
      </div>
    )
  }

  return (
    <div className={styles.rootContainer}>
      {rewardCountdownContainer}
      <div className={styles.progressContainer}>
        <div>
          <div className="body">{i18n.streakProgress}</div>
          <div className={classNames('title', styles.daysLeftText)}>
            <em>{`${currentStreakInDays}`}</em>
            {` / ${requiredStreakInDays} ${i18n.days}`}
          </div>
        </div>
        <div className={styles.progressIconsContainer}>
          {lightningBoltIcons.map((filled, index) => (
            <LightningBolt
              className={classNames(styles.streakIcon, getFilledClass(filled))}
              key={`lightningBolt:${index}`}
            />
          ))}
          <LightningBolt />
        </div>
      </div>
      <hr></hr>
      <div className={classNames('body-sm', styles.bottomContainer)}>
        <RingProgress
          size={40}
          thickness={4}
          classNames={{
            root: styles.ringProgressRoot,
            svg: styles.ringProgressSvg,
            label: styles.ringProgressLabel
          }}
          label={
            <LightningBolt
              className={classNames(
                styles.circleLightning,
                lightningBoltCircleClass
              )}
            />
          }
          rootColor={rootColor}
          sections={[
            {
              value: percentCompleted,
              color: 'var(--color-alert-300)'
            }
          ]}
        />
        {ctaText}
      </div>
    </div>
  )
}
