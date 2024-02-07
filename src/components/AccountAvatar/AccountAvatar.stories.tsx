import type { Meta, StoryObj } from '@storybook/react'

import AccountAvatar from './index'

const meta: Meta<typeof AccountAvatar> = {
  title: 'AccountAvatar',
  component: AccountAvatar
}

export default meta

type Story = StoryObj<typeof AccountAvatar>

export const Offline: Story = {}

export const Online: Story = {
  args: {
    userId: 'elio@hyperplay.xyz'
  }
}
