import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import RewardsSection from './index'
import { RewardsCardProps } from '../RewardsCard'

import YGGTransp from '@/assets/stories/YggIconTransparent.png'
import PremiumTicket from '@/assets/stories/premiumTicket.png'
import xocietyNTx from '@/assets/stories/xocietyNTx.png'
import YGGReward from '@/assets/stories/ygg.png'

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
 * - Link integration with routing libraries (Next.js, React Router, etc.)
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
          'A horizontally scrollable section for displaying game rewards with navigation controls, designed to showcase incentives for completing quests. Features circular scrolling to navigate seamlessly from end to beginning and vice versa. Navigation controls are hidden on mobile views and when there are not enough items to scroll. Integrates with link routing for navigation to quest details.'
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

const LinkComponent = ({
  children,
  href
}: {
  children: React.ReactNode
  href: string
}) => (
  <a href={href} data-testid="reward-link">
    {children}
  </a>
)

export default meta

type Story = StoryObj<typeof RewardsSection>

const i18n = {
  claimsLabel: 'Claims left',
  claimsLeftLabel: 'Unlimited'
}

// Sample rewards data for stories
const rewardsData: RewardsCardProps[] = [
  {
    id: 1,
    questId: 602,
    rewardImage: PremiumTicket,
    reward: '1000 YGG Points',
    i18n
  },
  {
    id: 2,
    questId: 534,
    rewardImage: YGGTransp,
    reward: '+1 NFT',
    i18n
  },
  {
    id: 3,
    questId: 585,
    rewardImage: xocietyNTx,
    reward: 'NTx Airdrop',
    i18n
  },
  {
    id: 4,
    questId: 602,
    rewardImage: YGGReward,
    reward: '500 YGG Points',
    i18n
  },
  {
    id: 5,
    questId: 534,
    rewardImage: PremiumTicket,
    reward: 'Exclusive Skin',
    i18n
  },
  {
    id: 6,
    questId: 585,
    rewardImage: xocietyNTx,
    reward: 'Special Badge',
    i18n
  },
  {
    id: 7,
    questId: 602,
    rewardImage: YGGTransp,
    reward: 'Premium Ticket',
    i18n
  },
  {
    id: 8,
    questId: 534,
    rewardImage: xocietyNTx,
    reward: 'Exclusive NFT',
    i18n
  }
]

// Extended rewards data for the multiple rewards story
const extendedRewardsData = [
  ...rewardsData,
  {
    id: 6,
    questId: 585,
    rewardImage: xocietyNTx,
    reward: 'Limited Edition NFT',
    i18n
  },
  {
    id: 7,
    questId: 602,
    rewardImage: YGGTransp,
    reward: '2000 YGG Points',
    i18n
  },
  {
    id: 8,
    questId: 534,
    rewardImage: PremiumTicket,
    reward: 'Season Pass',
    i18n
  }
]

export const Default: Story = {
  args: {
    rewards: rewardsData,
    Link: LinkComponent
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story:
          'Default implementation with proper link routing using the href prop for reward items.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the section header exists
    const header = canvas.getByTestId('rewards-header')
    expect(header).toBeInTheDocument()

    // Check for navigation controls
    const navigationIcons = canvas.getAllByTestId('arrow-button')
    expect(navigationIcons.length).toBe(2)

    // Check that reward cards are rendered with correct elements
    const rewardLinks = canvas.getAllByRole('link')
    expect(rewardLinks.length).toBe(rewardsData.length)

    // Test for reward images
    const rewardImages = canvas.getAllByRole('img')
    expect(rewardImages.length).toBeGreaterThan(0)

    // Verify at least one image has a valid src
    const firstImage = rewardImages[0]
    expect(firstImage).toHaveAttribute('src')
  }
}

export const FewItems: Story = {
  args: {
    rewards: rewardsData.slice(0, 2), // Just show 2 rewards to demonstrate hiding navigation
    Link: LinkComponent
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
  }
}

// not passing rewards so we can test the dummy data loading state
export const LoadingWithDummyData: Story = {
  args: {
    Link: LinkComponent,
    isLoading: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story:
          'Loading state is indicated by a spinner or skeleton loader on the reward cards, providing visual feedback to users while data is being fetched.'
      }
    }
  }
}

export const MobileView: Story = {
  args: {
    rewards: extendedRewardsData,
    Link: LinkComponent
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}
