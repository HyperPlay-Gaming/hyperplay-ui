import React, { useState } from 'react'

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
import { ModalAnimation } from '@/components/Modal'
import SignUp from '@/components/SignUp/index'
import { AuthProviderButton, Button } from '@/index'

const meta: Meta<typeof SignUp> = {
  title: 'auth/SignUp'
}

export default meta

type Story = StoryObj<typeof SignUp>

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
    label: <AuthProviderButton.Label>Soon</AuthProviderButton.Label>
  }
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const close = () => setOpen(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalAnimation isOpen={open} onClose={close}>
          <SignUp
            providers={authProviders}
            onClose={close}
            onWalletSignup={() => alert('Wallet requested')}
            onAuthProviderSignup={(provider) =>
              alert(`Provider: ${provider.id}`)
            }
            onEmailSignup={(email) => alert(`Email requested: ${email}`)}
          />
        </ModalAnimation>
      </>
    )
  }
}
