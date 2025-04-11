import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import YGGTransp from '@/assets/stories/YggIconTransparent.png'
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
    rewardName: {
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
    },
    amountPerUser: {
      description: 'Amount of the reward per user (e.g., "1000", "1", "0.5")',
      control: 'text'
    },
    decimals: {
      description:
        'Number of decimal places for the reward amount (e.g., 18 for ERC20 tokens)',
      control: 'number'
    },
    rewardType: {
      description: 'Type of reward (e.g., "ERC20", "ERC721", "ERC1155")',
      control: 'text'
    },
    questId: {
      description:
        'The ID of the quest associated with the reward (used for routing)',
      control: 'number'
    }
  }
}

export default meta

type Story = StoryObj<typeof RewardsCard>

// Default Story with NFT Reward - Tests that ERC721 type shows only the name without amount
export const NFTReward: Story = {
  args: {
    id: 1,
    questId: 101,
    amountPerUser: '1',
    rewardName: 'Premium YGG NFT',
    rewardType: 'ERC721',
    rewardImage: YGGTransp,
    claimsLeft: undefined
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify reward text is displayed without the amount prefix
    const rewardText = canvas.getByText('Premium YGG NFT')
    expect(rewardText).toBeInTheDocument()

    // Ensure the text doesn't contain the amount prefix
    const rewardTextContent = rewardText.textContent
    expect(rewardTextContent).not.toContain('+1')

    // Check that the image is present
    const rewardImageContainer = canvas.getByRole('img')
    expect(rewardImageContainer).toBeInTheDocument()
  }
}

// Crypto Reward with Large Number
export const CryptoRewardHugeNumber: Story = {
  args: {
    id: 3,
    questId: 103,
    amountPerUser: '200000000000000000000000',
    rewardName: 'Dyno Coin',
    decimals: 18,
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
    rewardName: 'Loading Reward',
    rewardImage: YGGReward,
    claimsLeft: undefined,
    isLoading: true
  }
}
