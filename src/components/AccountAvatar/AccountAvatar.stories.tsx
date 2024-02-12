import type { Meta, StoryObj } from '@storybook/react'

import { MetaMaskColored, WalletConnectLogo } from '@/assets/images'

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
    userId: 'johndoe@mail.com'
  }
}

export const WalletConnected: Story = {
  args: {
    userId: 'johndoe@mail.com',
    WalletIcon: <MetaMaskColored />
  }
}
export const WalletConnectedButOffline: Story = {
  args: {
    WalletIcon: <WalletConnectLogo />
  }
}
