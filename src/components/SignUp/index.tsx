import React, { HTMLProps, useState } from 'react'

import cn from 'classnames'

import {
  Email,
  HyperPlayLogoColored,
  MetamaskColored,
  WalletConnectLogo
} from '@/assets/images'
import Button from '@/components/Button'
import Modal from '@/components/Modal/Modal'
import { AuthProviderButton, TextInput } from '@/index'

import Alert, { AlertProps } from '../Alert'
import { AuthProviderButtonProps } from '../AuthProviderButton'
import styles from './SignUp.module.scss'

type Steps = 'selectProvider' | 'email'

interface ConnectedProviders {
  metamaskExtension: boolean
  walletConnect: boolean
  metamaskMobile: boolean
  email: boolean
}

interface AuthProps {
  alert?: AlertProps
  providers: AuthProviderButtonProps[]
  onAuthProviderSignup: (provider: AuthProviderButtonProps) => void
  onEmailSignup: (email: string) => void
  onWalletSignup: () => void
  connected: ConnectedProviders
}

interface I18n {
  signupTitle: string
  signupSubtitle: string
  emailTitle: string
  emailSubtitle: string
  emailPlaceholder: string
  emailBackButton: string
  emailSignupButton: string
  recommendedLabel: string
  emailButton: string
}

const SelectProvider = ({
  alert,
  providers,
  onEmailClick,
  onAuthProviderClick,
  onWalletClick,
  i18n,
  connected
}: {
  alert?: AlertProps
  providers: AuthProviderButtonProps[]
  onEmailClick: () => void
  onWalletClick: () => void
  onAuthProviderClick: (provider: AuthProviderButtonProps) => void
  i18n: I18n
  connected: ConnectedProviders
}) => {
  return (
    <>
      <HyperPlayLogoColored />
      <Modal.Header>
        <Modal.Title>{i18n.signupTitle}</Modal.Title>
        <Modal.Body>{i18n.signupSubtitle}</Modal.Body>
      </Modal.Header>
      {alert && <Alert {...alert}></Alert>}
      <div className={styles.providersContainer}>
        <AuthProviderButton
          name="MetaMask"
          icon={<MetamaskColored className={styles.icon} />}
          label={
            <AuthProviderButton.Label
              style={{ color: 'var(--color-primary-200)' }}
            >
              {i18n.recommendedLabel}
            </AuthProviderButton.Label>
          }
          onClick={onWalletClick}
          connected={connected.metamaskExtension}
        />
        <AuthProviderButton
          name="MetaMask"
          icon={<MetamaskColored className={styles.icon} />}
          label={
            <AuthProviderButton.Label className="color-neutral-400">
              Mobile
            </AuthProviderButton.Label>
          }
          onClick={onWalletClick}
          connected={connected.metamaskMobile}
        />
        <AuthProviderButton
          name="WalletConnect"
          icon={<WalletConnectLogo />}
          onClick={onWalletClick}
          connected={connected.walletConnect}
        />
        {providers.map((provider) => (
          <AuthProviderButton
            key={provider.id}
            {...provider}
            onClick={() => onAuthProviderClick(provider)}
          />
        ))}
        <AuthProviderButton
          name={i18n.emailButton}
          icon={<Email className={styles.icon} />}
          onClick={onEmailClick}
          connected={connected.email}
        />
      </div>
    </>
  )
}

export const EmailForm = ({
  alert,
  onGoBack,
  onSubmit,
  i18n
}: {
  alert?: AlertProps
  onGoBack: () => void
  onSubmit: (email: string) => void
  i18n: I18n
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
      <Modal.HeadingIcon className={styles.emailRoundedIcon}>
        <Email className={styles.icon} width={20} height={20} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title>{i18n.emailTitle}</Modal.Title>
        <Modal.Body>{i18n.emailSubtitle}</Modal.Body>
      </Modal.Header>
      <form onSubmit={handleSubmit} className={styles.form}>
        {alert && <Alert {...alert}></Alert>}
        <TextInput
          required
          classNames={{ input: styles.emailInput }}
          placeholder={i18n.emailPlaceholder}
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
            {i18n.emailBackButton}
          </Button>
          <Button
            type="secondary"
            htmlType="submit"
            size="large"
            className={styles.actionButton}
          >
            {i18n.emailSignupButton}
          </Button>
        </div>
      </form>
    </>
  )
}

export interface SignupModalProps extends HTMLProps<HTMLDivElement>, AuthProps {
  onClose: () => void
  i18n?: I18n
}

const SignUp = ({
  alert,
  className,
  providers,
  onAuthProviderSignup,
  onEmailSignup,
  onWalletSignup,
  onClose,
  i18n = {
    signupTitle: 'Sign up to get started',
    signupSubtitle:
      'Select which account you would like to use to create your HyperPlay account.',
    recommendedLabel: 'Recommended',
    emailButton: 'Email',
    emailTitle: 'Sign up with email',
    emailSubtitle:
      'Connect your email address to create your HyperPlay account.',
    emailPlaceholder: 'Enter your email',
    emailBackButton: 'Back',
    emailSignupButton: 'Sign up'
  },
  connected,
  ...props
}: SignupModalProps) => {
  const [step, setStep] = useState<Steps>('selectProvider')
  return (
    <Modal.Root {...props} className={cn(className, styles.root)}>
      <Modal.CloseButton aria-label="close signup modal" onClick={onClose} />
      {step === 'selectProvider' && (
        <SelectProvider
          alert={alert}
          providers={providers}
          onWalletClick={onWalletSignup}
          onEmailClick={() => setStep('email')}
          onAuthProviderClick={onAuthProviderSignup}
          i18n={i18n}
          connected={connected}
        />
      )}
      {step === 'email' && (
        <EmailForm
          alert={alert}
          onGoBack={() => setStep('selectProvider')}
          onSubmit={(email) => onEmailSignup(email)}
          i18n={i18n}
        />
      )}
    </Modal.Root>
  )
}

export default SignUp
