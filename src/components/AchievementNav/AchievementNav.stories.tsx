/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AchievementNav from '.'
import { gamesAdded } from './data'

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
    onGameAdd={() => console.log('Game Added!')}
    gamesAdded={gamesAdded}
    showGameAddButton={false}
  />
)
