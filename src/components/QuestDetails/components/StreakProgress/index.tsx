import React from 'react'
import styles from './index.module.scss'

import { PlayStreakEligibility } from '../../types'
import { LightningBolt } from '@/assets/images'

export interface StreakProgressI18n {
  streakProgress: string
}

export interface StreakProgressProps extends PlayStreakEligibility {
  i18n?: StreakProgressI18n
}

export default function StreakProgress({
  currentStreakInDays,
  requiredStreakInDays,
  i18n = { streakProgress: 'Streak Progress' }
}: StreakProgressProps) {
  return (
    <div>
      <div>
        <div>
          <div>{i18n.streakProgress}</div>
          <div>{`${currentStreakInDays} / ${requiredStreakInDays}`}</div>
        </div>
        <div>lightning bolts</div>
      </div>
      <div>
        <div>
          <LightningBolt />
        </div>
        {`Play each day so your streak won't reset!`}
      </div>
    </div>
  )
}
