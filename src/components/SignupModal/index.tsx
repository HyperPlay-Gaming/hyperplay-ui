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
import Button from '@/components/ButtonV2'
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

type Steps = 'selectProvider' | 'email' | 'checkEmail' | 'verifyEmail'

const SelectProvider = ({ onEmailClick }: { onEmailClick: () => void }) => {
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
          <AuthProviderButton key={provider} {...providerInfo[provider]} />
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    onSubmit(email)
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
            variant="tertiary"
            size="large"
            onClick={onGoBack}
            className={styles.actionButton}
          >
            Back
          </Button>
          <Button
            variant="secondary"
            type="submit"
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

const EmailVerification = ({
  email,
  onResend
}: {
  email: string
  onResend: () => void
}) => {
  return (
    <>
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <div>
        <h6 className={styles.title}>Check your email</h6>
        <span className={cn('body', styles.subtitle)}>
          We sent a verification link to{' '}
          <span className="text--semibold">{email}</span>
        </span>
      </div>
      <Button variant="primary" size="medium" className={styles.verifyButton}>
        Verify email
      </Button>
      <div className={styles.linkContainer}>
        <span className={cn('button-sm', styles.subtitle)}>
          {`Didn't receive an email?`}
        </span>
        &nbsp;
        <Button
          variant="link"
          size="small"
          className={styles.buttonLink}
          onClick={onResend}
        >
          Click to resend
        </Button>
      </div>
    </>
  )
}

export interface SignupModalProps extends ModalProps {
  onEmailRequest: (email: string) => void
}

const SignupModal = ({ onEmailRequest, ...props }: SignupModalProps) => {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<Steps>('selectProvider')

  const handleClose = () => {
    props.onClose()
    setTimeout(() => {
      setStep('selectProvider')
      setEmail('')
    }, DEFAULT_TRANSITION_DURATION)
  }

  return (
    <PopUpModal {...props} onClose={handleClose} size={600}>
      {step === 'selectProvider' && (
        <SelectProvider onEmailClick={() => setStep('email')} />
      )}
      {step === 'email' && (
        <EmailForm
          onGoBack={() => setStep('selectProvider')}
          onSubmit={(email) => {
            onEmailRequest(email)
            setStep('checkEmail')
            setEmail(email)
          }}
        />
      )}
      {step === 'checkEmail' && email && (
        <EmailVerification
          email={email}
          onResend={() => onEmailRequest(email)}
        />
      )}
    </PopUpModal>
  )
}

export default SignupModal
