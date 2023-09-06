import React from 'react'

import { Modal, ModalProps } from '@mantine/core'
import cn from 'classnames'

import {
  CloseButton,
  CloseModalIcon,
  DiscordFilled,
  Email,
  EpicStoreLogo,
  GoogleLogo,
  HyperPlayLogoColored,
  KickLogo,
  MetamaskColored,
  SteamLogo,
  TwitchLogo,
  XLogo
} from '@/assets/images'
import { AuthProviderButtonProps } from '@/components/AuthProviderButton'
import { AuthProviderButton } from '@/index'

import styles from './SignupModal.module.scss'

const sigInProviders = [
  'wallet',
  'steam',
  'twitch',
  'kick',
  'twitter',
  'discord',
  'email',
  'google'
] as const

type SigInProvider = (typeof sigInProviders)[number]

const providerInfo: Record<SigInProvider, AuthProviderButtonProps> = {
  wallet: {
    name: 'Wallet',
    icon: <MetamaskColored className={styles.icon} />,
    label: (
      <AuthProviderButton.Label className={styles.recommendedLabel}>
        Recommended
      </AuthProviderButton.Label>
    )
  },
  discord: {
    name: 'Discord',
    icon: <DiscordFilled className={styles.icon} />
  },
  email: {
    name: 'Email',
    icon: <Email className={styles.icon} />
  },
  google: {
    name: 'Google',
    icon: <GoogleLogo className={styles.icon} />
  },
  kick: {
    name: 'Kick',
    icon: <KickLogo className={styles.icon} />
  },
  steam: {
    name: 'Steam',
    icon: <SteamLogo className={styles.icon} />
  },
  twitch: {
    name: 'Twitch',
    icon: <TwitchLogo className={styles.icon} />
  },
  twitter: {
    name: 'Twitter/X',
    icon: <XLogo className={styles.icon} />
  }
}

export type SignupModalProps = ModalProps

const SignupModal = ({ classNames, ...props }: SignupModalProps) => {
  return (
    <Modal
      {...props}
      size={600}
      classNames={{ ...classNames, content: styles.content, body: styles.body }}
      withCloseButton={false}
    >
      <button
        className={styles.closeButton}
        aria-label="close button"
        onClick={props.onClose}
      >
        <CloseModalIcon />
      </button>
      <HyperPlayLogoColored />
      <div>
        <h6 className={styles.title}>Sign up to get started</h6>
        <span className={cn('body', styles.subtitle)}>
          Select which account you would like to use to create your HyperPlay
          account.
        </span>
      </div>
      <div className={styles.providersContainer}>
        {sigInProviders.map((provider) => (
          <AuthProviderButton key={provider} {...providerInfo[provider]} />
        ))}
        <AuthProviderButton
          name="Epig Games"
          icon={<EpicStoreLogo />}
          label={<AuthProviderButton.Label>Soon</AuthProviderButton.Label>}
        />
      </div>
    </Modal>
  )
}

export default SignupModal
