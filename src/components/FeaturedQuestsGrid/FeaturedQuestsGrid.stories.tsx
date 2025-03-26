/* eslint-disable @typescript-eslint/no-explicit-any */
import { rectSortingStrategy } from '@dnd-kit/sortable'
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
  Container: (props: any) => <GridContainer {...props} columns={6} />,
  strategy: rectSortingStrategy,
  itemCount: 6
}

export const BasicSetup = () => <Sortable {...props} />
