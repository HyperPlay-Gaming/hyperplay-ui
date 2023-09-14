/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AchievementProgress from '.'
import ProgressKey from './components/ProgressKey'

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

export const ProgressKeyRow = () => (
  <ProgressKey safeMintedCount={5} safeTotalCount={20} />
)
export const ProgressKeyColumn = () => (
  <ProgressKey safeMintedCount={5} safeTotalCount={20} direction="column" />
)
