/* eslint-disable @typescript-eslint/no-explicit-any */
import { MeasuringStrategy } from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import { Meta, StoryObj } from '@storybook/react'

import { FeaturedQuestsGrid } from './FeaturedQuestsGrid'
import { GridContainer } from './GridContainer'
import { Sortable, Props as SortableProps } from './Sortable'

const meta: Meta<typeof FeaturedQuestsGrid> = {
  title: 'FeaturedQuestsGrid',
  component: FeaturedQuestsGrid
}

export default meta

type Story = StoryObj<typeof FeaturedQuestsGrid>

export const Default: Story = {}

const props: Partial<SortableProps> = {
  adjustScale: true,
  removable: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140
  })
}

export const BasicSetup = () => <Sortable {...props} />

export const RemovableItems = () => {
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true })

  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
    />
  )
}
