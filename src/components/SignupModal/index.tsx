import React, { useState } from 'react'

import { ModalProps } from '@mantine/core'
import cn from 'classnames'

import {
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
import Button from '@/components/Button'
import { DEFAULT_TRANSITION_DURATION } from '@/components/PopUpModal'
import { AuthProviderButton, PopUpModal, TextInput } from '@/index'

import styles from './SignupModal.module.scss'

const sigInProviders = [
  'wallet',
  'steam',
  'twitch',
  'kick',
  'twitter',
  'discord',
  'google'
] as const

export type AuthProvider = (typeof sigInProviders)[number]

const providerInfo: Record<AuthProvider, AuthProviderButtonProps> = {
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

type Steps = 'selectProvider' | 'email'

const SelectProvider = ({
  onEmailClick,
  onAuthProviderClick
}: {
  onEmailClick: () => void
  onAuthProviderClick: (provider: AuthProvider) => void
}) => {
  return (
    <>
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
          <AuthProviderButton
            key={provider}
            {...providerInfo[provider]}
            onClick={() => onAuthProviderClick(provider)}
          />
        ))}
        <AuthProviderButton
          name="Epig Games"
          icon={<EpicStoreLogo />}
          label={<AuthProviderButton.Label>Soon</AuthProviderButton.Label>}
        />
        <AuthProviderButton
          name="Email"
          icon={<Email className={styles.icon} />}
          onClick={onEmailClick}
        />
      </div>
    </>
  )
}

const EmailForm = ({
  onGoBack,
  onSubmit
}: {
  onGoBack: () => void
  onSubmit: (email: string) => void
}) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: { value: string }
    }
    onSubmit(formElements.email.value)
  }

  return (
    <>
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <div>
        <h6 className={styles.title}>Sign up with email</h6>
        <span className={cn('body', styles.subtitle)}>
          Connect your email address to create your HyperPlay account.
        </span>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput
          required
          classNames={{ input: styles.emailInput }}
          placeholder="Enter your email"
          label="Email"
          name="email"
          type="email"
          width="100%"
        />
        <div className={styles.signupButtonContainers}>
          <Button
            type="tertiary"
            size="large"
            onClick={onGoBack}
            className={styles.actionButton}
          >
            Back
          </Button>
          <Button
            type="secondary"
            htmlType="submit"
            size="large"
            className={styles.actionButton}
          >
            Sign in
          </Button>
        </div>
      </form>
    </>
  )
}

export interface SignupModalProps extends ModalProps {
  onAuthSignup: (provider: AuthProvider) => void
  onEmailSignup: (email: string) => void
}

const SignupModal = ({
  onEmailSignup,
  onAuthSignup,
  ...props
}: SignupModalProps) => {
  const [step, setStep] = useState<Steps>('selectProvider')

  const handleClose = () => {
    props.onClose()
    setTimeout(() => {
      setStep('selectProvider')
    }, DEFAULT_TRANSITION_DURATION)
  }

  return (
    <PopUpModal {...props} onClose={handleClose} size={600}>
      {step === 'selectProvider' && (
        <SelectProvider
          onAuthProviderClick={(provider) => onAuthSignup(provider)}
          onEmailClick={() => setStep('email')}
        />
      )}
      {step === 'email' && (
        <EmailForm
          onGoBack={() => setStep('selectProvider')}
          onSubmit={(email) => onEmailSignup(email)}
        />
      )}
    </PopUpModal>
  )
}

export default SignupModal
