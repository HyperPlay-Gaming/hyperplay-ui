import { Meta, StoryObj } from '@storybook/react'

import droid from '@/assets/Droid.png'

import { GameListingCard } from '.'

const meta: Meta<typeof GameListingCard> = {
  title: 'GameListingCard',
  component: GameListingCard,
  args: {
    image: (
      <img src={droid} alt="Game" style={{ width: '100%', height: '100%' }} />
    ),
    title: 'Game Title',
    action: 'add',
    onAction: () => alert('Action')
  },
  argTypes: {
    action: {
      control: false
    }
  }
}

export default meta

type Story = StoryObj<typeof GameListingCard>

export const Default: Story = {}

export const WithRemoveAction: Story = {
  args: {
    action: 'remove'
  }
}

export const WithNoneAction: Story = {
  args: {
    action: 'none'
  }
}

export const LongTitle: Story = {
  args: {
    title: 'Game Title with a long title that will wrap'
  }
}
