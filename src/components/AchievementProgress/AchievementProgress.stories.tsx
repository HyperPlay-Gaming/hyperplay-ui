/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AchievementProgress from '.'

export default {
  title: 'AchievementProgress',
  component: AchievementProgress
}

export const Progress = () => (
  <AchievementProgress
    safeMintedCount={5}
    safeTotalCount={20}
    mintedProgress={10}
    mintableProgress={20}
  />
)
