import type { Meta, StoryObj } from '@storybook/react'

import { Ellipsis } from '@/assets/images'

import { formRewardsProps } from './components/FormRewards/FormRewards.stories'
import { RewardsSummary, RewardsSummaryProps } from './index'

type Story = StoryObj<typeof RewardsSummary>

const meta: Meta<typeof RewardsSummary> = {
  title: 'Quests/RewardsSummary',
  component: RewardsSummary
}

export default meta

const props: RewardsSummaryProps = {
  title: 'Reward 1',
  icon: <Ellipsis />,
  rewardsProps: formRewardsProps,
  addERC1155TokenId: () =>
    console.log('add new input field for erc 1155 token id')
}

export const Default: Story = {
  args: { ...props }
}
