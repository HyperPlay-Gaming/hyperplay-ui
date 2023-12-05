import React from 'react'

import AchievementSummaryTable, { AchievementSummaryTableProps } from '.'
import AchievementCard, { AchievementCardProps } from '../AchievementCard'
import { itemType } from '../Dropdowns/Dropdown'
import { Meta, StoryObj } from '@storybook/react'
import { GameAdded } from '../AchievementNav'
import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'
import cyberpunkCard from '@/assets/steamCards/cyberpunkCard.jpg?url'
import reCard from '@/assets/steamCards/residentEvilCard.jpg?url'

const meta: Meta<typeof AchievementSummaryTable> = {
  title: 'Achievements/AchievementSummaryTable',
  component: AchievementSummaryTable
}

export default meta

type Story = StoryObj<typeof AchievementSummaryTable>
type Data = AchievementCardProps & { id: string }

const games = [
  {
    id: '1',
    image: cyberpunkCard,
    title: 'Diablo II',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    state: 'default',

    totalAchievementsCount: 30
  },
  {
    id: '2',
    image: cupheadCard,
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    state: 'default',

    ctaProps: { disabled: true }
  },
  {
    id: '3',
    image: reCard,
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

for (let i = 5; i < 20; ++i) {
  const newGame = JSON.parse(JSON.stringify(games[i % 4]))
  newGame.id = i.toString()
  games.push(newGame)
}

const achievementsSortOptions = [
  { text: 'Alphabetically (ASC)' },
  { text: 'Alphabetically (DES)' }
] as itemType[]
const gamesNodes = games.map(({ id, ...rest }) => (
  <AchievementCard key={id} {...rest} />
))

const selectedSort = achievementsSortOptions[0]
const activeFilter = 'all'
const gamesAdded: GameAdded[] = []
const imagesToPreload = games.map((game)=>game.image)

const props: AchievementSummaryTableProps = {
  imagesToPreload,
  games: gamesNodes,
  sortProps:{
    options: achievementsSortOptions,
    selected: selectedSort,
    onItemChange: (val) => console.log(`Sort item changed to ${val}`)
  },
  paginationProps: {
    handleNextPage: () => console.log('next page'),
    handlePrevPage: () => console.log('prev page')
  },
  filterProps:{
    activeFilter,
    setActiveFilter: (val) => console.log(`Active filter changed to ${val}`)
  },
  mintButtonProps:{ onClick: () => console.log('mint'), totalToMint: 1 },
  achievementNavProps:{ freeMints: 10, basketAmount: 20, gamesAdded, showGameAddButton: false },
  isFetching: false,
  hasFetchedAll: false,
  fetchNextPage: () => {
    console.log('fetch next page!')
  },
  tabs: [{value: 'all', label: 'All'},{value: 'new', label: 'New'},{value: 'minted', label: 'Minted'}],
  messageModalProps: {
    title: 'Oops!',
    message: `It looks like we couldn't find any games in your Steam account at the moment. Just a quick reminder to double-check that your game details are set to public. This way, we can access your achievements and provide you with the best experience.`
  }
}

export const Default: Story = {
  args: { ...props },
  render: (args)=>{
    return <div style={{ height: '1000px', display: 'flex' }}><AchievementSummaryTable {...args} /></div>
  }
}
