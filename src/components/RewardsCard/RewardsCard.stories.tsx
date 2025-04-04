import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import YGGTransp from '@/assets/stories/YggIconTransparent.png'
import PremiumTicket from '@/assets/stories/premiumTicket.png'
import YGGReward from '@/assets/stories/ygg.png'

import RewardsCard from './index'

const meta: Meta<typeof RewardsCard> = {
  title: 'Quests/RewardsCard',
  component: RewardsCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A versatile card component for displaying game rewards with customizable claims information and internationalization support.'
      }
    }
  },
  argTypes: {
    reward: {
      description:
        'The name or description of the reward (e.g., "1000 YGG Points", "+1 NFT")',
      control: 'text'
    },
    rewardImage: {
      description:
        'The image URL representing the reward (supports various image formats)',
      control: 'text'
    },
    claimsLeft: {
      description:
        'Number or text indicating available claims (defaults to "Unlimited" when not provided)',
      control: 'text'
    },
    i18n: {
      description:
        'Internationalization options for customizing labels (claimsLabel and claimsLeftLabel)'
    },
    isLoading: {
      description: 'Shows the card in a loading state with shiny animation',
      control: 'boolean'
    }
  }
}

export default meta

type Story = StoryObj<typeof RewardsCard>

// Default Story with NFT Reward
export const NFTReward: Story = {
  args: {
    id: 1,
    questId: 101,
    reward: '+1 NFT',
    rewardImage: YGGTransp,
    claimsLeft: undefined
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify reward text is displayed
    const rewardText = canvas.getByText('+1 NFT')
    expect(rewardText).toBeInTheDocument()

    // Check that the image is present
    const rewardImageContainer = canvas.getByRole('img')
    expect(rewardImageContainer).toBeInTheDocument()
  }
}

// Game Ticket Reward
export const GameTicketReward: Story = {
  args: {
    id: 2,
    questId: 102,
    reward: 'Premium Game Ticket',
    rewardImage: PremiumTicket,
    claimsLeft: undefined
  }
}

// Cryptocurrency Reward
export const CryptoReward: Story = {
  args: {
    id: 3,
    questId: 103,
    reward: '1000 YGG',
    rewardImage: YGGReward,
    claimsLeft: undefined,
    i18n: {
      claimsLabel: 'Available'
    }
  }
}

// Loading State
export const LoadingState: Story = {
  args: {
    id: 4,
    questId: 104,
    reward: 'Loading Reward',
    rewardImage: YGGReward,
    claimsLeft: undefined,
    isLoading: true
  }
}
