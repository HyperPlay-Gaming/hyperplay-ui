import type { Meta, StoryObj } from '@storybook/react'

import GameSelector from '.'
import { GameSelectorProps } from './types'
import { useArgs } from '@storybook/preview-api';
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest';
import { wait } from '../../../tests/utils/wait';

const meta: Meta<typeof GameSelector> = {
  title: 'Quests/GameSelector',
  component: GameSelector
}

export default meta

type Story = StoryObj<typeof GameSelector>

export const props: GameSelectorProps = {
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
  render: function Render(args) {    
    const [{ selectedGames, searchResultGames }, updateArgs] = useArgs<GameSelectorProps>();

    for (const game_i of selectedGames){
      game_i.onClick = () => {
        const newSelectedGames = selectedGames.filter((val)=>val.gameId !== game_i.gameId)
        updateArgs({selectedGames: newSelectedGames, searchResultGames})
      }
    }
    
    for (const game_i of searchResultGames){
      game_i.onClick = () => {
        selectedGames.push(JSON.parse(JSON.stringify(game_i)))
        updateArgs({selectedGames, searchResultGames})
      }
    }

    return (
        <GameSelector {...args} selectedGames={selectedGames} searchResultGames={searchResultGames} />
    )
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    
    await step('Remove first selected game', async () => {
      const firstSelectedElement = canvas.getByTestId(`selected-${props.selectedGames[0].gameId}`)
      await userEvent.click(firstSelectedElement)
      await wait(1000)
      expect(firstSelectedElement).not.toBeInTheDocument()
    })
    
    await step('Click the search input and type gun', async () => {
      await userEvent.click(canvas.getByTestId('search-input'))
      await userEvent.type(canvas.getByTestId('search-input'), 'gun')
      
      const element = document.querySelector('div[data-portal="true"]') as HTMLElement
      await expect(element).not.toBeNull()
      if (element === null){
        throw 'element null'
      }

      await step('Click the first game result', async () => {
        const dropdownCanvas = within(element)
        await userEvent.click(dropdownCanvas.getByTestId(`clickable-${props.searchResultGames[0].gameId}`))
    
        const newlyAddedGame = canvas.getByTestId(`selected-${props.searchResultGames[0].gameId}`)
        expect(newlyAddedGame).toBeInTheDocument()
      })
    })
  }
}
