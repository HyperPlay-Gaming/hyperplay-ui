import type { Meta, StoryObj } from '@storybook/react'

import HorizontalCard, { HorizontalCardProps } from './HorizontalCard'
import Button from '../Button'
import Sticker from '../Sticker'

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
    children: {
      control: false,
      description: 'Content to display below the title (badge, button, etc.)'
    },
    orderNumber: {
      control: 'text',
      description: 'Order number to display'
    },
    noHover: {
      control: 'boolean',
      description: 'Disable hover effects on the card'
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
    children: <Sticker>Action</Sticker>,
    tone: 'neutral'
  }
}

export const WithButton: Story = {
  args: {
    ...defaultProps,
    tone: 'neutral',
    children: (
      <Button type="secondary" size="small" onClick={() => {}}>
        View Game
      </Button>
    )
  }
}

export const WithOrderNumber: Story = {
  args: {
    ...defaultProps,
    orderNumber: '#1',
    tone: 'neutral'
  }
}

export const NoHover: Story = {
  args: {
    ...defaultProps,
    noHover: true,
    children: (
      <Button type="secondary" size="small" onClick={() => {}}>
        Go to App Store
      </Button>
    ),
    tone: 'neutral'
  }
}

export const AsLink: Story = {
  render: () => {
    const Link = ({ href, children, ...props }: React.ComponentProps<'a'>) => (
      <a href={href} {...props}>
        {children}
      </a>
    )

    return (
      <HorizontalCard
        cardComponent={Link}
        title="Link Card"
        tone="neutral"
        size="large"
        href="/game/link-example"
      >
        <Button type="secondary" size="small" onClick={() => {}}>
          Go to App Store
        </Button>
      </HorizontalCard>
    )
  }
}

type Story = StoryObj<typeof HorizontalCard>

export default meta
