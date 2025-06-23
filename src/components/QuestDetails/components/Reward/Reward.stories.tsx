import type { Meta, StoryObj } from '@storybook/react'

import RewardImage from '@/assets/RewardImage.png'

import { QuestReward } from '../../types'
import { Reward } from './index'
import { within, expect } from '@storybook/test'

const meta: Meta<typeof Reward> = {
  title: 'Quests/QuestDetails/Reward',
  component: Reward,
  tags: ['autodocs'],
  args: {
    onClaim: () => alert('claimed')
  },
  render: (args) => {
    return (
      <div style={{ width: '300px', padding: '20px' }}>
        <Reward {...args} />
      </div>
    )
  }
}

export default meta
type Story = StoryObj<typeof Reward>

const defaultReward: QuestReward = {
  chainName: 'Ethereum',
  title: 'Awesome Reward',
  imageUrl: RewardImage,
  numOfClaimsLeft: '100',
  numToClaim: '1',
  isClaimed: false,
  marketplaceUrl: 'https://marketplace.example.com/reward'
}

const defaultI18n = {
  claimsLeft: 'claims left',
  viewReward: 'View Reward',
  claimed: 'Claimed',
  claim: 'Claim',
  claimNotAvailable: "This reward isn't available to claim right now."
}

export const Default: Story = {
  args: {
    reward: defaultReward,
    i18n: defaultI18n
  }
}

export const Claimed: Story = {
  args: {
    reward: { ...defaultReward, isClaimed: true },
    i18n: defaultI18n
  }
}

export const NoClaimsLeft: Story = {
  args: {
    reward: { ...defaultReward, numOfClaimsLeft: '0' },
    i18n: defaultI18n
  }
}

export const NoMarketplaceUrl: Story = {
  args: {
    reward: { ...defaultReward, marketplaceUrl: undefined },
    i18n: defaultI18n
  }
}

export const LargeNumbers: Story = {
  args: {
    reward: {
      ...defaultReward,
      numOfClaimsLeft: '1000000',
      numToClaim: '1000'
    },
    i18n: defaultI18n
  }
}

export const ClaimPending: Story = {
  args: {
    reward: { ...defaultReward, claimPending: true },
    i18n: defaultI18n
  }
}

export const ClaimNotAvailable: Story = {
  args: {
    reward: { ...defaultReward },
    i18n: defaultI18n,
    claimNotAvailable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('button', { name: 'Claim' })).toBeDisabled()
  }
}
