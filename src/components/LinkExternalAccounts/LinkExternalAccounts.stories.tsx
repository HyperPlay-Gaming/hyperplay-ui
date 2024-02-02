import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

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

const meta: Meta<typeof LinkExternalAccountsModal> = {
  title: 'auth/LinkExternalAccounts'
}

export default meta

const connectedProviders = {
  metamaskExtension: true,
  metamaskMobile: false,
  walletConnect: true
}

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

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <LinkExternalAccountsModal
        providers={authProviders}
        onClose={() => alert('Closed')}
        onWalletClick={() => alert('Wallet linked')}
        onAuthProviderClick={(provider) => alert(`Provider: ${provider.id}`)}
      />
    </div>
  )
}

export const WalletProvidersConnected: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <LinkExternalAccountsModal
        providers={authProviders}
        onClose={() => alert('Closed')}
        onWalletClick={() => alert('Wallet linked')}
        onAuthProviderClick={(provider) => alert(`Provider: ${provider.id}`)}
        walletProvidersConnectionState={connectedProviders}
      />
    </div>
  )
}

export const Error: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <LinkExternalAccountsModal
        alert={{
          variant: 'danger',
          message: 'Something went wrong. Please try again later.'
        }}
        providers={authProviders}
        onClose={close}
        onWalletClick={() => alert('Wallet linked')}
        onAuthProviderClick={(provider) => alert(`Provider: ${provider.id}`)}
      />
    </div>
  )
}
