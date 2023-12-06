import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import cyberpunkCard from '@/assets/steamCards/cyberpunkCard.jpg?url'

import GameAchievements, { GameAchievementsProps } from '.'
import { gamesAdded } from '../AchievementNav/AchievementNav.stories'
import { itemType } from '../Dropdowns/Dropdown'

const meta: Meta<typeof GameAchievements> = {
  title: 'Achievements/GameAchievements',
  component: GameAchievements
}

export default meta

type Story = StoryObj<typeof GameAchievements>

const achievementsSortOptions = [{ text: 'Alphabetically' }] as itemType[]
const selectedSort = achievementsSortOptions[0]

const achievements = [
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

for (let i = 5; i < 20; ++i) {
  const newGame = JSON.parse(JSON.stringify(achievements[i % 4]))
  newGame.id = i.toString()
  achievements.push(newGame)
}

const props: GameAchievementsProps = {
  achievementNavProps: {
    freeMints: 10,
    basketAmount: 0,
    onGameAdd: () => console.log('game added'),
    gamesAdded: gamesAdded,
    addThisGameText: 'Add this game',
    gamesToMintLabelText: 'Games to mint',
    showGameAddButton: true
  },
  game: {
    title: 'Title of game'
  },
  mintedAchievementsCount: 5,
  totalAchievementsCount: 30,
  mintableAchievementsCount: 15,
  achievements,
  sortProps: {
    options: achievementsSortOptions,
    selected: selectedSort,
    onItemChange: (val: itemType) => console.log(`Setting sort props to ${val}`)
  },
  paginationProps: {
    handleNextPage: () => console.log('next page'),
    handlePrevPage: () => console.log('prev page')
  },

  gameCardImage: cyberpunkCard
}

export const Default: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div style={{ height: '1000px', width: '100%' }}>
        <GameAchievements {...args} />
      </div>
    )
  }
}
