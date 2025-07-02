import type { Meta, StoryObj } from '@storybook/react'

import HorizontalCard, { HorizontalCardProps } from '.'

const meta: Meta<typeof HorizontalCard> = {
  title: 'Components/HorizontalCard',
  component: HorizontalCard,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true
    }
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'brand'],
      description: 'The visual tone of the card'
    },
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'The size variant of the card'
    },
    title: {
      control: 'text',
      description: 'The title text'
    },
    badge: {
      control: 'text',
      description: 'Badge text to display'
    },
    button: {
      control: 'text',
      description: 'Button text to display'
    },
    orderNumber: {
      control: 'text',
      description: 'Order number to display'
    }
  }
}

const defaultProps: HorizontalCardProps = {
  title: 'Moon Blasters',
  onCardClick: () => {},
  tone: 'neutral',
  size: 'large'
}

export const Default: Story = {
  args: {
    ...defaultProps
  }
}

export const WithBadge: Story = {
  args: {
    ...defaultProps,
    badge: 'First-Person Shooter',
    tone: 'neutral',
    size: 'large'
  }
}

export const WithButton: Story = {
  args: {
    ...defaultProps,
    button: 'View Game',
    tone: 'neutral',
    size: 'large'
  }
}

export const WithOrderNumber: Story = {
  args: {
    ...defaultProps,
    orderNumber: '#1',
    tone: 'neutral',
    size: 'large'
  }
}

type Story = StoryObj<typeof HorizontalCard>

export default meta
