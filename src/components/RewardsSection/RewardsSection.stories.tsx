import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import YGGTransp from '@/assets/stories/YggIconTransparent.png'
import PremiumTicket from '@/assets/stories/premiumTicket.png'
import xocietyNTx from '@/assets/stories/xocietyNTx.png'
import YGGReward from '@/assets/stories/ygg.png'

import RewardsSection from './index'

/**
 * The `RewardsSection` component displays a horizontally scrollable collection of reward cards
 * with navigation controls. It's designed to showcase available rewards that users can earn by
 * completing quests in the application.
 *
 * ## Use Cases
 * - Quest rewards showcase in game dashboards
 * - Achievement rewards display in user profiles
 * - Special offers and collectibles presentation
 * - Seasonal or limited-time reward galleries
 *
 * ## Features
 * - Horizontal scrolling with smooth animation
 * - Left and right navigation controls
 * - Responsive layout that adapts to different screen sizes
 * - Consistent presentation of rewards with visual indicators for availability
 * - Clear organization with descriptive heading
 *
 * ## Accessibility
 * - Keyboard-navigable scrolling controls
 * - Semantic structure with proper heading hierarchy
 * - Clear visual indicators for interactive elements
 */
const meta: Meta<typeof RewardsSection> = {
  title: 'Quests/RewardsSection',
  component: RewardsSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A horizontally scrollable section for displaying game rewards with navigation controls, designed to showcase incentives for completing quests.'
      }
    }
  },
  argTypes: {
    rewards: {
      description: 'Array of reward objects to display in the section',
      control: 'object'
    }
  }
}

export default meta

type Story = StoryObj<typeof RewardsSection>

// Sample rewards data for stories
const rewardsData = [
  {
    id: 1,
    rewardImage: YGGReward,
    reward: '1000 YGG Points',
    claimsLeft: 500
  },
  {
    id: 2,
    rewardImage: xocietyNTx,
    reward: 'NTx Airdrop',
    claimsLeft: 300
  },
  {
    id: 3,
    rewardImage: PremiumTicket,
    reward: 'Premium Ticket',
    claimsLeft: 100
  },
  {
    id: 4,
    rewardImage: YGGTransp,
    reward: '500 YGG Points',
    claimsLeft: 750
  },
  {
    id: 5,
    rewardImage: xocietyNTx,
    reward: 'Exclusive NFT',
    claimsLeft: 50
  }
]

// Extended rewards data for the multiple rewards story
const extendedRewardsData = [
  ...rewardsData,
  {
    id: 6,
    rewardImage: PremiumTicket,
    reward: 'Season Pass',
    claimsLeft: 200
  },
  {
    id: 7,
    rewardImage: YGGReward,
    reward: '2000 YGG Points',
    claimsLeft: 150
  },
  {
    id: 8,
    rewardImage: xocietyNTx,
    reward: 'Limited Edition NFT'
  }
]

export const Default: Story = {
  args: {
    rewards: rewardsData
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the section title is displayed correctly
    expect(
      canvas.getByText('Complete Quests to Earn These Rewards')
    ).toBeInTheDocument()

    // Check for navigation controls
    const navigationIcons = canvas.getAllByRole('generic', { hidden: true })
    expect(navigationIcons.length).toBeGreaterThan(0)

    // Check that all reward cards are rendered
    expect(canvas.getByText('1000 YGG Points')).toBeInTheDocument()
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()
    expect(canvas.getByText('Premium Ticket')).toBeInTheDocument()
    expect(canvas.getByText('500 YGG Points')).toBeInTheDocument()
    expect(canvas.getByText('Exclusive NFT')).toBeInTheDocument()
  }
}

export const SingleReward: Story = {
  args: {
    rewards: [rewardsData[0]]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the section title is displayed correctly
    expect(
      canvas.getByText('Complete Quests to Earn These Rewards')
    ).toBeInTheDocument()

    // Check that only one reward card is rendered
    expect(canvas.getByText('1000 YGG Points')).toBeInTheDocument()
    expect(canvas.queryByText('NTx Airdrop')).not.toBeInTheDocument()
  }
}

export const MultipleRewards: Story = {
  args: {
    rewards: extendedRewardsData
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the section title is displayed correctly
    expect(
      canvas.getByText('Complete Quests to Earn These Rewards')
    ).toBeInTheDocument()

    // Check that multiple reward cards are rendered
    expect(canvas.getByText('1000 YGG Points')).toBeInTheDocument()
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()
    expect(canvas.getByText('Premium Ticket')).toBeInTheDocument()
    expect(canvas.getByText('Season Pass')).toBeInTheDocument()
    expect(canvas.getByText('2000 YGG Points')).toBeInTheDocument()
    expect(canvas.getByText('Limited Edition NFT')).toBeInTheDocument()

    // Verify that we have reward cards with different claims left values
    expect(canvas.getByText('Claims left: 500')).toBeInTheDocument()
    expect(canvas.getByText('Claims left: 150')).toBeInTheDocument()
    expect(canvas.getByText('Claims left: Unlimited')).toBeInTheDocument()
  }
}

export const MixedClaimsLeft: Story = {
  args: {
    rewards: [
      {
        id: 1,
        rewardImage: YGGReward,
        reward: '1000 YGG Points',
        claimsLeft: 500
      },
      {
        id: 2,
        rewardImage: xocietyNTx,
        reward: 'NTx Airdrop'
        // Unlimited claims since claimsLeft is omitted
      },
      {
        id: 3,
        rewardImage: PremiumTicket,
        reward: 'Premium Ticket',
        claimsLeft: 100
      }
    ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check for rewards with explicit claims left
    expect(canvas.getByText('Claims left: 500')).toBeInTheDocument()
    expect(canvas.getByText('Claims left: 100')).toBeInTheDocument()

    // Check for rewards with unlimited claims
    expect(canvas.getByText('Claims left: Unlimited')).toBeInTheDocument()
  }
}
