import type { Meta, StoryObj } from '@storybook/react'
import { expect, within, fireEvent } from '@storybook/test'

import YGGTransp from '@/assets/stories/YggIconTransparent.png'
import PremiumTicket from '@/assets/stories/premiumTicket.png'
import xocietyNTx from '@/assets/stories/xocietyNTx.png'
import YGGReward from '@/assets/stories/ygg.png'

import RewardsSection from './index'
import { RewardsCardProps } from '../RewardsCard'

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
 * - Left and right navigation controls with circular scrolling (loops back to beginning/end)
 * - Navigation controls only displayed when content is scrollable
 * - Responsive layout that adapts to different screen sizes (navigation controls hidden on mobile)
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
          'A horizontally scrollable section for displaying game rewards with navigation controls, designed to showcase incentives for completing quests. Features circular scrolling to navigate seamlessly from end to beginning and vice versa. Navigation controls are hidden on mobile views and when there are not enough items to scroll.'
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
const rewardsData: RewardsCardProps[] = [
  {
    id: 1,
    questId: 1,
    rewardImage: YGGReward,
    reward: '1000 YGG Points',
    claimsLeft: 500
  },
  {
    id: 2,
    questId: 2,
    rewardImage: xocietyNTx,
    reward: 'NTx Airdrop',
    claimsLeft: 300
  },
  {
    id: 3,
    questId: 3,
    rewardImage: PremiumTicket,
    reward: 'Premium Ticket',
    claimsLeft: 100
  },
  {
    id: 4,
    questId: 4,
    rewardImage: YGGTransp,
    reward: '500 YGG Points',
    claimsLeft: 750
  },
  {
    id: 5,
    questId: 5,
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
    questId: 6,
    rewardImage: PremiumTicket,
    reward: 'Season Pass',
    claimsLeft: 200
  },
  {
    id: 7,
    questId: 7,
    rewardImage: YGGReward,
    reward: '2000 YGG Points',
    claimsLeft: 150
  },
  {
    id: 8,
    questId: 8,
    rewardImage: xocietyNTx,
    reward: 'Limited Edition NFT'
  }
]

export const Default: Story = {
  args: {
    rewards: rewardsData,
    linkElement: ({ children }) => <div>{children}</div>
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
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
    rewards: [rewardsData[0]],
    linkElement: ({ children }) => <div>{children}</div>
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
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
    rewards: extendedRewardsData,
    linkElement: ({ children }) => <div>{children}</div>
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
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
        questId: 1,
        rewardImage: YGGReward,
        reward: '1000 YGG Points',
        claimsLeft: 500
      },
      {
        id: 2,
        questId: 2,
        rewardImage: xocietyNTx,
        reward: 'NTx Airdrop'
        // Unlimited claims since claimsLeft is omitted
      },
      {
        id: 3,
        questId: 3,
        rewardImage: PremiumTicket,
        reward: 'Premium Ticket',
        claimsLeft: 100
      }
    ],
    linkElement: ({ children }) => <div>{children}</div>
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
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

export const CircularNavigation: Story = {
  args: {
    rewards: extendedRewardsData,
    linkElement: ({ children }) => <div>{children}</div>
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Ensure all initial rewards are rendered
    expect(canvas.getByText('1000 YGG Points')).toBeInTheDocument()
    expect(canvas.getByText('Limited Edition NFT')).toBeInTheDocument()

    // Find navigation buttons
    const leftButton = canvas.getAllByRole('generic')[0] as HTMLElement
    const rightButton = canvas.getAllByRole('generic')[1] as HTMLElement

    // Note: Full circular navigation testing would require simulating scrollLeft positioning
    // which is not fully possible in this test environment, but we can test the button clicks

    // Test right button click
    fireEvent.click(rightButton)

    // Test left button click
    fireEvent.click(leftButton)

    // Verify component still renders after navigation
    expect(
      canvas.getByText('Complete Quests to Earn These Rewards')
    ).toBeInTheDocument()
  }
}

export const MobileView: Story = {
  args: {
    rewards: extendedRewardsData,
    linkElement: ({ children }) => <div>{children}</div>
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the section title is displayed correctly
    expect(
      canvas.getByText('Complete Quests to Earn These Rewards')
    ).toBeInTheDocument()

    // Check that multiple reward cards are rendered in mobile view
    expect(canvas.getByText('1000 YGG Points')).toBeInTheDocument()
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()
    expect(canvas.getByText('Premium Ticket')).toBeInTheDocument()

    // In mobile view, navigation controls should be hidden via CSS
    // So we can only verify that the content is still accessible via scrolling

    // Verify the reward cards are rendered properly
    expect(canvas.getByText('Claims left: 500')).toBeInTheDocument()
    expect(canvas.getByText('Claims left: 150')).toBeInTheDocument()
    expect(canvas.getByText('Claims left: Unlimited')).toBeInTheDocument()
  }
}

export const FewItems: Story = {
  args: {
    rewards: rewardsData.slice(0, 2), // Just show 2 rewards to demonstrate hiding navigation
    linkElement: ({ children }) => <div>{children}</div>
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop' // Use a wide view to ensure we're not hiding due to mobile view
    },
    docs: {
      description: {
        story:
          'When there are only a few items that fit within the container without scrolling, navigation buttons are automatically hidden.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the rewards are displayed
    expect(canvas.getByText('1000 YGG Points')).toBeInTheDocument()
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()

    // Check that the header is present
    expect(
      canvas.getByText('Complete Quests to Earn These Rewards')
    ).toBeInTheDocument()

    // Try to find navigation buttons (they should not be in the document)
    const navigationIcons = canvas.queryAllByRole('button')
    expect(navigationIcons.length).toBe(0)
  }
}
