/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import GameAchievements from '.'

export default {
  title: 'Achievements/GameAchievements',
  component: GameAchievements
}

export const Default = () => (
  <GameAchievements
    freeMints={10}
    basketAmount={0}
    game={{
      title: 'Title of game',
      tags: ['VR', 'Gore', 'Action', 'Simulation', 'Violent', 'Indie'],
      achievements: [
        {
          id: '1',
          title: 'Achievement 1',
          description: 'With an image',
          image: 'https://i.imgur.com/Cij5vdL.png',
          isLocked: false
        },
        {
          id: '2',
          title: 'Achievement 2',
          description: 'Without an image',
          image: 'brokenImage',
          isLocked: true
        },
        {
          id: '3',
          title: 'Achievement 3',
          description: 'Without an image',
          image: 'brokenImage',
          isLocked: true
        },
        {
          id: '4',
          title: 'Achievement 4',
          description: 'Without an image',
          image: 'brokenImage',
          isLocked: true
        }
      ]
    }}
    mintedAchievementsCount={5}
    totalAchievementsCount={30}
    mintableAchievementsCount={15}
    handleNext={() => console.log('next')}
    handlePrevious={() => console.log('previous')}
  />
)
