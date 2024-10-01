import type { Meta, StoryObj } from '@storybook/react'

import { ToastQuest, ToastQuestProps } from '.'

const meta: Meta<typeof ToastQuest> = {
  title: 'ToastQuest',
  component: ToastQuest
}

export default meta

type Story = StoryObj<typeof ToastQuest>

const props: ToastQuestProps = {
  status: 'available',
  onCloseClick: () => console.log('close clicked!')
}

export const Default: Story = {
  args: { ...props }
}

export const Completed: Story = {
  args: { ...props, status: 'completed' }
}

export const Claimed: Story = {
  args: {
    ...props,
    status: 'claimed',
    i18n: {
      overlayToggleKey: 'X',
      overlayToggleModKey: 'option',
      toSeeDetails: 'to see details.',
      toClaimReward: 'to claim your reward.',
      questAvailable: 'Quest available!',
      questComplete: 'Quest complete!',
      plus: '+',
      rewardClaimed: 'Claim successful',
      youHaveClaimed: 'You have claimed 100 rewards.'
    }
  }
}
