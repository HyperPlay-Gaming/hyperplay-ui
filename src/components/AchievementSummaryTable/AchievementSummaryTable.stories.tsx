import React from 'react'

import AchievementSummaryTable, { AchievementSummaryTableProps } from '.'
import AchievementCard, { AchievementCardProps } from '../AchievementCard'
import { itemType } from '../Dropdowns/Dropdown'
import { Meta, StoryObj } from '@storybook/react'

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

for (let i = 5; i < 50; ++i) {
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

const props: AchievementSummaryTableProps = {
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
  achievementNavProps:{ freeMints: 10, basketAmount: 20 },
  isFetching: false,
  hasFetchedAll: false,
  fetchNextPage: () => {
    console.log('fetch next page!')
  }
}

export const Default: Story = {
  args: { ...props }
}


// export const Default = () => {
//   const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
//   const [activeFilter, setActiveFilter] = useState<AchievementFilter>('all')

//   const filteredGames = useMemo(() => {
//     if (activeFilter === 'minted') {
//       return games.filter((game) => game.state === 'active')
//     }
//     if (activeFilter === 'new') {
//       return games.filter((game) => game.isNewAchievement)
//     }
//     return games
//   }, [activeFilter])

//   return (
//     <div style={{ height: '1000px', display: 'flex' }}>
//       <AchievementSummaryTable
//         games={filteredGames.map(({ id, ...rest }) => (
//           <AchievementCard key={id} {...rest} />
//         ))}
//         sortProps={{
//           options: achievementsSortOptions,
//           selected: selectedSort,
//           onItemChange: setSelectedSort
//         }}
//         paginationProps={{
//           handleNextPage: () => console.log('next page'),
//           handlePrevPage: () => console.log('prev page')
//         }}
//         filterProps={{
//           activeFilter,
//           setActiveFilter
//         }}
//         mintButtonProps={{ onClick: () => console.log('mint'), totalToMint: 1 }}
//         achievementNavProps={{ freeMints: 10, basketAmount: 20 }}
//         isFetching={false}
//         hasFetchedAll={false}
//         fetchNextPage={() => {
//           console.log('fetch next page!')
//         }}
//       />
//     </div>
//   )
// }
