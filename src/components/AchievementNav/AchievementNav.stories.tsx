/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AchievementNav from '.'

export default {
  title: 'Achievements/AchievementNav',
  component: AchievementNav
}

export const Default = () => (
  <AchievementNav
    freeMints={10}
    basketAmount={0}
    nextButtonProps={{ onClick: () => console.log('next') }}
    previousButtonProps={{ onClick: () => console.log('previous') }}
  />
)
