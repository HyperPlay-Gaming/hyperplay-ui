import type { Meta, StoryObj } from '@storybook/react'

import RewardImage from '@/assets/RewardImage.png'

import { QuestReward } from '../../types'
import Reward from './index'

const meta: Meta<typeof Reward> = {
  title: 'Quests/Reward',
  component: Reward,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Reward>

const defaultReward: QuestReward = {
  id: 1,
  chainName: 'Ethereum',
  chain_id: 1,
  name: 'Awesome Reward',
  image_url: RewardImage,
  numClaimsLeft: '100',
  numToClaim: '1',
  isClaimed: false,
  marketplace_url: 'https://marketplace.example.com/reward',
  amount_per_user: 1,
  reward_type: 'ERC721',
  contract_address: '0x1234567890abcdef',
  decimals: 18,
  token_ids: []
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
    reward: { ...defaultReward, numClaimsLeft: '0' },
    i18n: defaultI18n
  }
}

export const NoMarketplaceUrl: Story = {
  args: {
    reward: { ...defaultReward, marketplace_url: null },
    i18n: defaultI18n
  }
}

export const LargeNumbers: Story = {
  args: {
    reward: {
      ...defaultReward,
      numClaimsLeft: '1000000',
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
