import type { Meta, StoryObj } from '@storybook/react'

import NoDeployedRewardContract from '@/components/NoDeployedRewardContract'

const meta: Meta<typeof NoDeployedRewardContract> = {
  title: 'Quests/NoDeployedRewardContract',
  component: NoDeployedRewardContract,
  args: {
    onDeployClick: () => alert('Delete button clicked')
  }
}

export default meta

type Story = StoryObj<typeof NoDeployedRewardContract>

export const Default: Story = {}
