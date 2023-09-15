/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react'

import AchievementSummaryTable from '.'
import { itemType } from '../Dropdowns/Dropdown'

export default {
  title: 'Achievement/AchievementSummaryTable',
  component: AchievementSummaryTable
}

export const Default = () => {
  const achievementsSortOptions = [{ text: 'Alphabetically' }] as itemType[]
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  return (
    <AchievementSummaryTable
      games={[
        {
          id: '1',
          image: 'https://i.imgur.com/Cij5vdL.png',
          title: 'Diablo II',
          mintedAchievementsCount: 5,
          mintableAchievementsCount: 10,
          totalAchievementsCount: 30
        },
        {
          id: '2',
          image: 'https://i.imgur.com/Cij5vdL.png',
          title: 'Star Wars: Knights of the Old Republic',
          mintedAchievementsCount: 5,
          mintableAchievementsCount: 10,
          totalAchievementsCount: 30,
          ctaProps: { disabled: true }
        },
        {
          id: '3',
          image: 'https://i.imgur.com/Cij5vdL.png',
          title: 'Star Wars: Knights of the Old Republic',
          mintedAchievementsCount: 5,
          mintableAchievementsCount: 10,
          totalAchievementsCount: 30,
          state: 'active'
        },
        {
          id: '3',
          image: '',
          title: 'Star Wars: Knights of the Old Republic',
          mintedAchievementsCount: 5,
          mintableAchievementsCount: 10,
          totalAchievementsCount: 30,
          isNewAchievement: true
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
