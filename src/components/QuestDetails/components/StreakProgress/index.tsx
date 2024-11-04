import React, { useEffect, useState } from 'react'

import {
  getPlayStreakDays,
  getPlaytimePercentage,
  getMidnightUTCTimestamp as getResetTimeInMsSinceEpoch
} from '@hyperplay/utils'
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
  sync: string
}

export interface StreakProgressProps extends PlayStreakEligibility {
  i18n?: StreakProgressI18n
}

function PlayStreakBolts({
  currentStreakInDays,
  requiredStreakInDays
}: {
  currentStreakInDays: number
  requiredStreakInDays: number
}) {
  const lightningBoltIcons: boolean[] = []

  if (requiredStreakInDays <= 24) {
    for (let i = 0; i < requiredStreakInDays; ++i) {
      lightningBoltIcons.push(i < currentStreakInDays)
    }
  }

  return (
    <div className={styles.progressIconsContainer}>
      {lightningBoltIcons.map((filled, index) => (
        <LightningBolt
          className={classNames(styles.streakIcon, filled && styles.filled)}
          key={`lightningBolt:${index}`}
        />
      ))}
      <LightningBolt />
    </div>
  )
}

export default function StreakProgress({
  currentStreakInDays,
  requiredStreakInDays,
  minimumSessionTimeInSeconds,
  accumulatedPlaytimeTodayInSeconds,
  lastPlaySessionCompletedDateTimeUTC,
  dateTimeCurrentSessionStartedInMsSinceEpoch,
  rightSection,
  i18n = {
    streakProgress: 'Streak Progress',
    days: 'days',
    playToStart: 'Play this game to start your streak!',
    progressTowardsStreak: `progress towards today's streak.`,
    playEachDay: `Play each day so your streak won't reset!`,
    streakCompleted: 'Streak completed! Claim your rewards now.',
    now: 'Now',
    dayResets: 'Day resets:',
    sync: 'Sync Progress'
  }
}: StreakProgressProps) {
  ;({ requiredStreakInDays, currentStreakInDays } = getPlayStreakDays({
    lastPlaySessionCompletedDateTimeUTC,
    requiredStreakInDays,
    currentStreakInDays
  }))
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

  const getDailySessionPercentCompleted = () =>
    getPlaytimePercentage({
      minimumSessionTimeInSeconds,
      accumulatedPlaytimeTodayInSeconds,
      lastPlaySessionCompletedDateTimeUTC,
      dateTimeCurrentSessionStartedInMsSinceEpoch
    })

  const [dailySessionPercentCompleted, setDailySessionPercentCompleted] =
    useState(getDailySessionPercentCompleted())

  const questStarted = !!currentStreakInDays || dailySessionPercentCompleted > 0

  function update() {
    if (!questFinished) {
      setTimeLeftString(getTimeLeftString())
    }

    if (dailySessionPercentCompleted < 100) {
      setDailySessionPercentCompleted(getDailySessionPercentCompleted())
    }
  }

  useEffect(() => {
    const interval = setInterval(() => update(), 1000)
    return () => clearInterval(interval)
  }, [])

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

  let progressCompletedColor = 'var(--color-alert-300)'
  if (dailySessionPercentCompleted >= 100) {
    lightningBoltCircleClass = styles.finished
    progressCompletedColor = 'var(--color-success-300)'
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
        {rightSection ? (
          <div className={styles.rightSection}>{rightSection}</div>
        ) : (
          <PlayStreakBolts
            currentStreakInDays={currentStreakInDays}
            requiredStreakInDays={requiredStreakInDays}
          />
        )}
      </div>
      <hr></hr>
      <div className={classNames('body-sm', styles.bottomContainer)}>
        <RingProgress
          size={40}
          thickness={2}
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
              color: progressCompletedColor
            }
          ]}
        />
        {ctaText}
      </div>
    </div>
  )
}
