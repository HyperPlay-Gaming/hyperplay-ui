import { MeasuringStrategy } from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  arrayMove,
  defaultAnimateLayoutChanges,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import type { Meta, StoryObj } from '@storybook/react'

import { GridContainer } from './GridContainer'
import { Sortable, Props as SortableProps } from './Sortable'
import { SortableGameListingCard } from './SortableGameListingCard'
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
    image: (
      <img
        src="https://picsum.photos/300/200"
        alt="The Legend of Zelda: Breath of the Wild"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
    action: 'none' as const,
    onAction: () => console.log('Remove game 1')
  },
  {
    id: '2',
    title: 'Red Dead Redemption 2',
    image: (
      <img
        src="https://picsum.photos/300/201"
        alt="Red Dead Redemption 2"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
    action: 'none' as const,
    onAction: () => console.log('Remove game 2')
  },
  {
    id: '3',
    title: 'God of War',
    image: (
      <img
        src="https://picsum.photos/300/202"
        alt="God of War"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
    action: 'none' as const,
    onAction: () => console.log('Remove game 3')
  },
  {
    id: '4',
    title: 'Elden Ring',
    image: (
      <img
        src="https://picsum.photos/300/203"
        alt="Elden Ring"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
    action: 'none' as const,
    onAction: () => console.log('Remove game 4')
  },
  {
    id: '5',
    title: 'The Witcher 3',
    image: (
      <img
        src="https://picsum.photos/300/204"
        alt="The Witcher 3"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
    action: 'none' as const,
    onAction: () => console.log('Remove game 5')
  },
  {
    id: '6',
    title: 'Black Myth: Wukong',
    image: (
      <img
        src="https://picsum.photos/300/205"
        alt="Black Myth: Wukong"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
    action: 'none' as const,
    onAction: () => console.log('Remove game 6')
  }
]

const props: Partial<SortableGameListingGridProps> = {
  adjustScale: true,
  Container: (props) => <GridContainer {...props} columns={6} />,
  items: mockGames.map((game) => game.id),
  reorderItems: arrayMove,
  renderItem: ({ index, ref, value: id, ...dndProps }) => {
    const activeGame = mockGames.find((game) => game.id === id)
    if (!activeGame) {
      return <></>
    }
    const { title, image, onAction } = activeGame
    return (
      <SortableGameListingCard
        {...dndProps}
        value={id}
        index={index}
        ref={ref as React.Ref<HTMLLIElement>}
        title={title}
        image={image}
        action={'remove'}
        onAction={onAction}
      />
    )
  }
}

export const Default: Story = {
  render: () => <SortableGameListingGrid {...props} />
}

const sortableProps: Partial<SortableProps> = {
  adjustScale: true,
  removable: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
    background: 'white',
    color: 'black'
  })
}

export const RemovableItems = () => {
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true })

  return (
    <Sortable
      {...sortableProps}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
    />
  )
}
