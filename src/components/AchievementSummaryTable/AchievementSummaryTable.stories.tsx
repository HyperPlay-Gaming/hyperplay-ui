/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AchievementSummaryTable from '.'

export default {
  title: 'AchievementSummaryTable',
  component: AchievementSummaryTable
}

export const Default = () => (
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
        state: 'update',
        isNewAchievement: true
      }
    ]}
  />
)
