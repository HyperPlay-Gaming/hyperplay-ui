import { Meta, StoryObj } from '@storybook/react'

import NoDeployedRewardContract from './index'

const meta: Meta<typeof NoDeployedRewardContract> = {
  title: 'quests/NoDeployedRewardContract',
  component: NoDeployedRewardContract,
  args: {
    message:
      'You currently don’t have an existing Reward Contract for ETH Mainnet Network. Please deploy a new Reward Contract.'
  }
}

export default meta

type Story = StoryObj<typeof NoDeployedRewardContract>

export const Default: Story = {}
