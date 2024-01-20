import type { Meta, StoryObj } from '@storybook/react'

import GameSelector, { GameSelectorProps } from '.'

const meta: Meta<typeof GameSelector> = {
  title: 'Quests/GameSelector',
  component: GameSelector
}

export default meta

type Story = StoryObj<typeof GameSelector>

const props: GameSelectorProps = {
  selectedGames: [
    {
      title: 'Cozy Time',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/2054740/capsule_231x87.jpg?t=1657686629',
      onClick: () => console.log('cod clicked')
    },
    {
      title: 'Magic vs Zombies',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/2054050/capsule_231x87.jpg?t=1693578294',
      onClick: () => console.log('cod clicked')
    }
  ],
  searchResultGames: [
    {
      title: 'Gun Gun Pixies',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/1023970/capsule_231x87.jpg?t=1644409843',
      onClick: () => console.log('gun gun pixies selected')
    },
    {
      title: 'Rusty Gun',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/1305540/capsule_231x87.jpg?t=1667018655',
      onClick: () => console.log('rusty gun selected')
    }
  ],
  onSearchInput: (text) => console.log('searching for ', text)
}

export const Default: Story = {
  args: { ...props }
}
