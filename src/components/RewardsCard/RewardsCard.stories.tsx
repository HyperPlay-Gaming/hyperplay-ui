import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import PremiumTicket from '@/assets/stories/premiumTicket.png'
import xocietyNTx from '@/assets/stories/xocietyNTx.png'
import YGGReward from '@/assets/stories/ygg.png'

import RewardsCard, { RewardsCardProps } from './index'

const meta: Meta<typeof RewardsCard> = {
  title: 'RewardsCard',
  component: RewardsCard
}

export default meta

type Story = StoryObj<typeof RewardsCard>

const props: RewardsCardProps = {
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

    // Check that the claims text uses the default unlimited value
    expect(canvas.getByText('Claims left: Unlimited')).toBeInTheDocument()
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

    // Check unlimited claims text
    expect(canvas.getByText('Claims left: Unlimited')).toBeInTheDocument()
  }
}

export const NTxAirdrop300: Story = {
  args: {
    ...props,
    rewardImage: xocietyNTx,
    reward: 'NTx Airdrop',
    claimsLeft: '300'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify airdrop text
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()

    // Verify claims count
    expect(canvas.getByText('Claims left: 300')).toBeInTheDocument()
  }
}

export const NTxAirdrop600: Story = {
  args: {
    ...props,
    rewardImage: xocietyNTx,
    reward: 'NTx Airdrop',
    claimsLeft: '600'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify airdrop text
    expect(canvas.getByText('NTx Airdrop')).toBeInTheDocument()

    // Verify claims count
    expect(canvas.getByText('Claims left: 600')).toBeInTheDocument()
  }
}

export const CustomLabels: Story = {
  args: {
    ...props,
    rewardImage: PremiumTicket,
    reward: 'Special Reward',
    claimsLeft: '42',
    i18n: {
      claimsLabel: 'Available',
      claimsLeftLabel: 'No limit'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check custom labels
    expect(canvas.getByText('Special Reward')).toBeInTheDocument()
    expect(canvas.getByText('Available: 42')).toBeInTheDocument()
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

    // Check that default unlimited text is used when claimsLeft is not provided
    expect(canvas.getByText('Claims left: Unlimited')).toBeInTheDocument()
  }
}
