import type { Meta, StoryObj } from '@storybook/react'

import RewardsSummary, { RewardsSummaryProps } from './index'

type Story = StoryObj<typeof RewardsSummary>

const meta: Meta<typeof RewardsSummary> = {
  title: 'Quests/RewardsSummary',
  component: RewardsSummary
}

export default meta

const props: RewardsSummaryProps = {
  title: 'Reward 1',
  chainName: 'Polygon',
  tokenType: 'ERC-721',
  tokenSymbol: 'GOLD',
  rewardPerPlayer: '1',
  marketplace: 'Opensea',
  tokenContractAddress: '0x955CF'
}

export const Default: Story = {
  args: { ...props }
}
