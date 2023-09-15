/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AchievementPageNav from '.'

export default {
  title: 'AchievementPageNav',
  component: AchievementPageNav
}

export const Default = () => (
  <AchievementPageNav
    freeMints={10}
    basketAmount={0}
    handleNext={() => console.log('next')}
    handlePrevious={() => console.log('previous')}
  />
)
