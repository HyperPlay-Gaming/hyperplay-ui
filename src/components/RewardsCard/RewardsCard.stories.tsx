import type { Meta, StoryObj } from '@storybook/react'

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
  args: { ...props }
}
