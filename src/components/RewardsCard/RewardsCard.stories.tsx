import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import YGGTransp from '@/assets/stories/YggIconTransparent.png'
import PremiumTicket from '@/assets/stories/premiumTicket.png'
import xocietyNTx from '@/assets/stories/xocietyNTx.png'
import YGGReward from '@/assets/stories/ygg.png'

import RewardsCard, { RewardsCardProps } from './index'

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
    }
  }
}

export default meta

type Story = StoryObj<typeof RewardsCard>

const props: RewardsCardProps = {
  id: '1',
  reward: '1000 YGG points',
  rewardImage: YGGReward
}

export const Default: Story = {
  args: { ...props },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the reward text is displayed correctly
    expect(canvas.getByText('1000 YGG points')).toBeInTheDocument()

    // Check that the card renders without errors
    const stickers = canvas.getAllByRole('generic', { hidden: true })
    expect(stickers.length).toBeGreaterThan(0)
  }
}

export const WithTransparentImage: Story = {
  args: {
    ...props,
    rewardImage: YGGTransp
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the reward text is displayed correctly
    expect(canvas.getByText('1000 YGG points')).toBeInTheDocument()

    // Check that the card renders without errors
    const stickers = canvas.getAllByRole('generic', { hidden: true })
    expect(stickers.length).toBeGreaterThan(0)
  }
}

export const NFTReward: Story = {
  args: {
    ...props,
    rewardImage: xocietyNTx,
    reward: '+1 NFT'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check NFT reward text
    expect(canvas.getByText('+1 NFT')).toBeInTheDocument()
  }
}

export const NTxAirdrop300: Story = {
  args: {
    ...props,
    rewardImage: xocietyNTx,
    reward: 'NTx Airdrop'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify airdrop text
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()

    // Check if image was loaded
    const imgElement = canvas.getByRole('img')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute(
      'src',
      expect.stringContaining('xocietyNTx')
    )
  }
}

export const NTxAirdrop600: Story = {
  args: {
    ...props,
    rewardImage: xocietyNTx,
    reward: 'NTx Airdrop'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify airdrop text
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()

    // Check if image was loaded
    const imgElement = canvas.getByRole('img')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute(
      'src',
      expect.stringContaining('xocietyNTx')
    )
  }
}

export const CustomLabels: Story = {
  args: {
    ...props,
    rewardImage: PremiumTicket,
    reward: 'Special Reward',

    i18n: {
      claimsLabel: 'Available',
      claimsLeftLabel: 'No limit'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check custom labels
    expect(canvas.getByText('Special Reward')).toBeInTheDocument()

    // Check if image was loaded
    const imgElement = canvas.getByRole('img')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute(
      'src',
      expect.stringContaining('premiumTicket')
    )
  }
}

export const WithoutClaimsLeft: Story = {
  args: {
    ...props,
    rewardImage: PremiumTicket,
    reward: 'Premium Ticket'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that reward displays correctly
    expect(canvas.getByText('Premium Ticket')).toBeInTheDocument()

    // Check if image was loaded
    const imgElement = canvas.getByRole('img')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute(
      'src',
      expect.stringContaining('premiumTicket')
    )
  }
}
