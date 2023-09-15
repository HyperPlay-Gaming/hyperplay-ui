/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import ProgressKey from '.'

export default {
  title: 'AchievementProgress/ProgressKey',
  component: ProgressKey
}

export const ProgressKeyRow = () => (
  <ProgressKey safeMintedCount={5} safeTotalCount={20} />
)
export const ProgressKeyColumn = () => (
  <ProgressKey safeMintedCount={5} safeTotalCount={20} direction="column" />
)
