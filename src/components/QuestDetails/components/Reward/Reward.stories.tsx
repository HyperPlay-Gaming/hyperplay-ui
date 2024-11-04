import type { Meta, StoryObj } from '@storybook/react'

import RewardImage from '@/assets/RewardImage.png'

import { QuestReward } from '../../types'
import Reward from './index'

const meta: Meta<typeof Reward> = {
  title: 'Quests/QuestDetails/Reward',
  component: Reward,
  tags: ['autodocs'],
  args: {
    onClaim: () => alert('claimed')
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
  marketplaceUrl: 'https://marketplace.example.com/reward',
  onClaim: () => alert('claimed')
}

const defaultI18n = {
  claimsLeft: 'claims left',
  viewReward: 'View Reward',
  claimed: 'Claimed',
  claim: 'Claim'
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

export const Loading: Story = {
  args: {
    reward: defaultReward,
    i18n: defaultI18n
  }
}
