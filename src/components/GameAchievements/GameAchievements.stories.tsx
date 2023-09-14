/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import GameAchievements from '.'

export default {
  title: 'GameAchievements',
  component: GameAchievements
}

export const Default = () => (
  <GameAchievements
    freeMints={10}
    basketAmount={0}
    game={{
      title: 'Title of game',
      tags: ['VR', 'Gore', 'Action', 'Simulation', 'Violent', 'Indie']
    }}
    achievements={[
      {
        id: '1',
        title: 'Achievement 1',
        description: 'Description 1',
        image: '',
        isLocked: false
      },
      {
        id: '2',
        title: 'Achievement 2',
        description: 'Description 2',
        image: '',
        isLocked: true
      }
    ]}
  />
)
