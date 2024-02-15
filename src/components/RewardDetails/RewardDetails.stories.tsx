import type { Meta, StoryObj } from '@storybook/react'

import { RewardDetails, RewardDetailsProps } from '.'

const meta: Meta<typeof RewardDetails> = {
  title: 'Quests/RewardDetails',
  component: RewardDetails,
  excludeStories: ['rewardDetailsProps']
}

export default meta

type Story = StoryObj<typeof RewardDetails>

export const rewardDetailsProps: RewardDetailsProps = {
  title: 'Reward 1',
  chainName: 'Polygon',
  tokenType: 'ERC-721',
  tokenSymbol: 'GOLD',
  rewardPerPlayer: '1',
  marketplace: 'Opensea',
  tokenContractAddress: '0x955CF'
}

export const Default: Story = {
  args: { ...rewardDetailsProps }
}

export const NoMarketplace: Story = {
  args: { ...rewardDetailsProps, marketplace: '' }
}
