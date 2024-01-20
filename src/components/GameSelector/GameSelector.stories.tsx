import type { Meta, StoryObj } from '@storybook/react'

import GameSelector from '.'
import { GameSelectorProps } from './types'
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof GameSelector> = {
  title: 'Quests/GameSelector',
  component: GameSelector
}

export default meta

type Story = StoryObj<typeof GameSelector>

const props: GameSelectorProps = {
  selectedGames: [
    {
      gameId: '123',
      title: 'Cozy Time',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/2054740/capsule_231x87.jpg?t=1657686629',
      onClick: () => console.log('cod clicked')
    },
    {
      gameId: '456',
      title: 'Magic vs Zombies',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/2054050/capsule_231x87.jpg?t=1693578294',
      onClick: () => console.log('cod clicked')
    }
  ],
  searchResultGames: [
    {
      gameId: '789',
      title: 'Gun Gun Pixies',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/1023970/capsule_231x87.jpg?t=1644409843',
      onClick: () => console.log('gun gun pixies selected')
    },
    {
      gameId: '289',
      title: 'Rusty Gun',
      img: 'https://cdn.akamai.steamstatic.com/steam/apps/1305540/capsule_231x87.jpg?t=1667018655',
      onClick: () => console.log('rusty gun selected')
    }
  ],
  onSearchInput: (text) => console.log('searching for ', text)
}

export const Default: Story = {
  args: { ...props },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  render: function Render({...args}) {    
    const [{ selectedGames, searchResultGames }, updateArgs] = useArgs<GameSelectorProps>();

    for (const game_i of selectedGames){
      game_i.onClick = () => {
        console.log('game id clicked ', game_i.gameId)
        const newSelectedGames = selectedGames.filter((val)=>val.gameId !== game_i.gameId)
        updateArgs({selectedGames: newSelectedGames, searchResultGames})
      }
    }
    
    for (const game_i of searchResultGames){
      game_i.onClick = () => {
        console.log('game id clicked ', game_i.gameId)
        selectedGames.push(JSON.parse(JSON.stringify(game_i)))
        updateArgs({selectedGames, searchResultGames})
      }
    }

    return (
        <GameSelector {...args} selectedGames={selectedGames} searchResultGames={searchResultGames} />
    )
  }
}
