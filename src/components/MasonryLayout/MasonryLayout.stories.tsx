import type { Meta, StoryObj } from '@storybook/react'

import gameImage from '@/assets/banners/QuestCardV2Image.png?url'

import MasonryLayout from '.'

const meta: Meta<typeof MasonryLayout> = {
  title: 'Components/MasonryLayout',
  component: MasonryLayout,
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof MasonryLayout>

export const Default: Story = {
  args: {
    imageUrl: gameImage
  }
}
