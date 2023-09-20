/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react'

import GameAchievements from '.'
import { itemType } from '../Dropdowns/Dropdown'

export default {
  title: 'Achievements/GameAchievements',
  component: GameAchievements
}

export const Default = () => {
  const achievementsSortOptions = [{ text: 'Alphabetically' }] as itemType[]
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])

  return (
    <GameAchievements
      achievementNavProps={{
        freeMints: 10,
        basketAmount: 0
      }}
      game={{
        title: 'Title of game',
        tags: ['VR', 'Gore', 'Action', 'Simulation', 'Violent', 'Indie']
      }}
      mintedAchievementsCount={5}
      totalAchievementsCount={30}
      mintableAchievementsCount={15}
      achievements={[
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
      ]}
      sortProps={{
        options: achievementsSortOptions,
        selected: selectedSort,
        onItemChange: setSelectedSort
      }}
      paginationProps={{
        currentPage: 1,
        totalPages: 3,
        handleNextPage: () => console.log('next page'),
        handlePrevPage: () => console.log('prev page')
      }}
    />
  )
}
