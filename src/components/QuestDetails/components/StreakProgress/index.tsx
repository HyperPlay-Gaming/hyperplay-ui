import React from 'react'

import { PlayStreakEligibility } from '../../types'

export interface StreakProgressProps extends PlayStreakEligibility {
  i18n?: {
    streakProgress: string
  }
}

export default function StreakProgress({
  currentStreakInDays,
  requiredStreakInDays,
  i18n = { streakProgress: 'Streak Progress' }
}: StreakProgressProps) {
  return (
    <div>
      <div>
        <div>{i18n.streakProgress}</div>
        <div>{`${currentStreakInDays} / ${requiredStreakInDays}`}</div>
      </div>
      <div>lightning bolts</div>
    </div>
  )
}
