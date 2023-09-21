import React, { HTMLProps, useState } from 'react'

import cn from 'classnames'

import { Email, HyperPlayLogoColored, MetamaskColored } from '@/assets/images'
import Button from '@/components/Button'
import Modal from '@/components/Modal/Modal'
import { AuthProviderButton, TextInput } from '@/index'

import styles from './SignUp.module.scss'

type Steps = 'selectProvider' | 'email'

export type AuthProvider = {
  id: string
  name: string
  icon?: React.ReactNode
  label?: React.ReactNode
}

interface AuthProps {
  providers: AuthProvider[]
  onAuthProviderSignup: (provider: AuthProvider) => void
  onEmailSignup: (email: string) => void
  onWalletSignup: () => void
}

interface I18n {
  signupTitle: string
  signupSubtitle: string
  emailTitle: string
  emailSubtitle: string
  emailPlaceholder: string
  emailBackButton: string
  emailSignupButton: string
  walletButton: string
  walletSubtitle: string
  emailButton: string
}

const SelectProvider = ({
  providers,
  onEmailClick,
  onAuthProviderClick,
  onWalletClick,
  i18n
}: {
  providers: AuthProvider[]
  onEmailClick: () => void
  onWalletClick: () => void
  onAuthProviderClick: (provider: AuthProvider) => void
  i18n: I18n
}) => {
  return (
    <>
      <HyperPlayLogoColored />
      <Modal.Header>
        <Modal.Title>{i18n.signupTitle}</Modal.Title>
        <Modal.Body>{i18n.signupSubtitle}</Modal.Body>
      </Modal.Header>
      <div className={styles.providersContainer}>
        <AuthProviderButton
          name={i18n.walletButton}
          icon={<MetamaskColored className={styles.icon} />}
          label={
            <AuthProviderButton.Label
              style={{ color: 'var(--color-primary-200)' }}
            >
              {i18n.walletSubtitle}
            </AuthProviderButton.Label>
          }
          onClick={onWalletClick}
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
        />
      </div>
    </>
  )
}

export const EmailForm = ({
  onGoBack,
  onSubmit,
  i18n
}: {
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
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <Modal.Header>
        <Modal.Title>{i18n.emailTitle}</Modal.Title>
        <Modal.Body>{i18n.emailSubtitle}</Modal.Body>
      </Modal.Header>
      <form onSubmit={handleSubmit} className={styles.form}>
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
    walletButton: 'Wallet',
    walletSubtitle: 'Recommended',
    emailButton: 'Email',
    emailTitle: 'Sign up with email',
    emailSubtitle:
      'Connect your email address to create your HyperPlay account.',
    emailPlaceholder: 'Enter your email',
    emailBackButton: 'Back',
    emailSignupButton: 'Sign up'
  },
  ...props
}: SignupModalProps) => {
  const [step, setStep] = useState<Steps>('selectProvider')
  return (
    <Modal.Content {...props} className={cn(className, styles.root)}>
      <Modal.CloseButton aria-label="close signup modal" onClick={onClose} />
      {step === 'selectProvider' && (
        <SelectProvider
          providers={providers}
          onWalletClick={onWalletSignup}
          onEmailClick={() => setStep('email')}
          onAuthProviderClick={onAuthProviderSignup}
          i18n={i18n}
        />
      )}
      {step === 'email' && (
        <EmailForm
          onGoBack={() => setStep('selectProvider')}
          onSubmit={(email) => onEmailSignup(email)}
          i18n={i18n}
        />
      )}
    </Modal.Content>
  )
}

export default SignUp
