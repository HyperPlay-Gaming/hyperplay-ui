/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState } from 'react'

import AchievementSummaryTable, { AchievementFilter } from '.'
import AchievementCard, { AchievementCardProps } from '../AchievementCard'
import { itemType } from '../Dropdowns/Dropdown'

export default {
  title: 'Achievements/AchievementSummaryTable',
  component: AchievementSummaryTable
}

type Data = AchievementCardProps & { id: string }

const games = [
  {
    id: '1',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Diablo II',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    state: 'default',

    totalAchievementsCount: 30
  },
  {
    id: '2',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    state: 'default',

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
    id: '4',
    image: '',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    isNewAchievement: true,
    state: 'default'
  }
] as Data[]

export const Default = () => {
  const achievementsSortOptions = [
    { text: 'Alphabetically (ASC)' },
    { text: 'Alphabetically (DES)' }
  ] as itemType[]
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('all')

  const filteredGames = useMemo(() => {
    if (activeFilter === 'minted') {
      return games.filter((game) => game.state === 'active')
    }
    if (activeFilter === 'new') {
      return games.filter((game) => game.isNewAchievement)
    }
    return games
  }, [activeFilter])

  return (
    <div style={{ height: '100vh' }}>
      <AchievementSummaryTable
        games={filteredGames.map(({ id, ...rest }) => (
          <AchievementCard key={id} {...rest} />
        ))}
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
        filterProps={{
          activeFilter,
          setActiveFilter
        }}
        mintButtonProps={{ onClick: () => console.log('mint') }}
        achievementNavProps={{ freeMints: 10, basketAmount: 20 }}
      />
    </div>
  )
}
