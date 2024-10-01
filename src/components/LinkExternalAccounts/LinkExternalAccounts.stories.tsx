import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import {
  DiscordFilled,
  EpicStoreLogo,
  GoogleLogo,
  KickLogo,
  SteamLogo,
  TwitchLogo,
  XLogo
} from '@/assets/images'

import LinkExternalAccountsModal from './index'

type Story = StoryObj<typeof LinkExternalAccountsModal>

const authProviders = [
  {
    id: 'discord',
    name: 'Discord',
    icon: <DiscordFilled fill="white" />
  },
  {
    id: 'google',
    name: 'Google',
    icon: <GoogleLogo fill="white" />
  },
  {
    id: 'kick',
    name: 'Kick',
    icon: <KickLogo fill="white" />
  },
  {
    id: 'steam',
    name: 'Steam',
    icon: <SteamLogo fill="white" />
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: <TwitchLogo fill="white" />
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: <XLogo fill="white" />
  },
  {
    id: 'epic',
    name: 'Epig Games',
    icon: <EpicStoreLogo />,
    disabled: true
  }
]

const meta: Meta<typeof LinkExternalAccountsModal> = {
  title: 'auth/LinkExternalAccountsModal',
  component: LinkExternalAccountsModal,
  args: {
    providers: authProviders,
    onClose: fn(),
    onWalletClick: fn(),
    onAuthProviderClick: fn()
  }
}

export default meta

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <LinkExternalAccountsModal {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const provider = authProviders[0]
    const onAuthSignup = args.onAuthProviderClick
    const canvas = within(canvasElement)
    const providerButton = canvas.getByRole('button', {
      name: new RegExp(provider.name, 'i')
    })
    await userEvent.click(providerButton)
    await expect(onAuthSignup).toHaveBeenCalledWith(provider)
  }
}

export const WalletLinked: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <LinkExternalAccountsModal
        {...args}
        walletAddress="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const onWalletClick = args.onWalletClick
    const canvas = within(canvasElement)
    const walletButton = canvas.getByRole('button', { name: /wallet/i })
    await userEvent.click(walletButton)
    await expect(onWalletClick).toHaveBeenCalled()
  }
}

export const WithEmail: Story = {
  args: {
    email: 'hello@hyperplay.xyz'
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <LinkExternalAccountsModal {...args} />
    </div>
  )
}

export const Error: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <LinkExternalAccountsModal
        {...args}
        alert={{
          variant: 'danger',
          message: 'Something went wrong. Please try again later.'
        }}
      />
    </div>
  )
}

export const WalletHidden: Story = {
  args: {
    hideWallet: true
  }
}
