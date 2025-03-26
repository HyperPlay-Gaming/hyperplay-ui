import { Meta, StoryObj } from '@storybook/react'

import { FeaturedQuestsGrid } from './FeaturedQuestsGrid'

const meta: Meta<typeof FeaturedQuestsGrid> = {
  title: 'FeaturedQuestsGrid',
  component: FeaturedQuestsGrid
}

export default meta

type Story = StoryObj<typeof FeaturedQuestsGrid>

export const Default: Story = {}
