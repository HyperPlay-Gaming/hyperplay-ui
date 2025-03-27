import { useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { Meta, StoryObj } from '@storybook/react'

import { GridContainer } from './GridContainer'
import {
  SortableGameListingGrid,
  SortableGameListingGridProps
} from './SortableGameListingGrid'

const meta: Meta<typeof SortableGameListingGrid> = {
  title: 'Components/SortableGameListingGrid',
  component: SortableGameListingGrid,
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj<typeof SortableGameListingGrid>

const mockGames = [
  {
    id: '1',
    title: 'The Legend of Zelda: Breath of the Wild',
    image: 'https://picsum.photos/300/200'
  },
  {
    id: '2',
    title: 'Red Dead Redemption 2',
    image: 'https://picsum.photos/300/202'
  },
  {
    id: '3',
    title: 'God of War',
    image: 'https://picsum.photos/300/203'
  },
  {
    id: '4',
    title: 'Elden Ring',
    image: 'https://picsum.photos/300/204'
  }
]

const props: Partial<SortableGameListingGridProps> = {
  adjustScale: true,
  placeholdersCount: 6,
  removable: true,
  Container: (props) => <GridContainer {...props} columns={6} />,
  items: mockGames.map((game) => game.id),
  reorderItems: arrayMove
}

export const Default: Story = {
  render: () => {
    const [games, setGames] = useState(mockGames)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const items = games.map((game) => game.id)
    return (
      <div>
        <SortableGameListingGrid
          {...props}
          items={items}
          setItems={(newItems) => {
            const newGames = newItems
              .map((id) => mockGames.find((game) => game.id === id))
              .filter(Boolean) as typeof mockGames
            setGames(newGames)
          }}
          activeId={activeId}
          setActiveId={setActiveId}
          getItemProps={(id) => {
            const activeGame = games.find((game) => game.id === id)
            if (!activeGame) {
              return { title: '', image: '' }
            }
            return activeGame
          }}
        />
        <button
          onClick={() => {
            setGames([
              ...games,
              {
                id: `${games.length + 1}`,
                title: `New Game ${games.length + 1}`,
                image: `https://picsum.photos/300/204?random=${
                  games.length + 1
                }`
              }
            ])
          }}
        >
          Add Card
        </button>
      </div>
    )
  }
}
