import React, { HTMLProps, useState } from 'react'

import cn from 'classnames'

import { Email, HyperPlayLogoColored, MetamaskColored } from '@/assets/images'
import Button from '@/components/Button'
import { AuthProviderButton, TextInput } from '@/index'

import styles from './SignUp.module.scss'

type Steps = 'selectProvider' | 'email'

export type AuthProvider = {
  id: string
  name: string
  icon?: React.ReactNode
  label?: React.ReactNode
}

type AuthProps = {
  providers: AuthProvider[]
  onAuthProviderSignup: (provider: AuthProvider) => void
  onEmailSignup: (email: string) => void
  onWalletSignup: () => void
}

const SelectProvider = ({
  providers,
  onEmailClick,
  onAuthProviderClick,
  onWalletClick
}: {
  providers: AuthProvider[]
  onEmailClick: () => void
  onWalletClick: () => void
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
        <AuthProviderButton
          name="Wallet"
          icon={<MetamaskColored className={styles.icon} />}
          label={
            <AuthProviderButton.Label
              style={{ color: 'var(--color-primary-200)' }}
            >
              Recommended
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
          name="Email"
          icon={<Email className={styles.icon} />}
          onClick={onEmailClick}
        />
      </div>
    </>
  )
}

export const EmailForm = ({
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

export type SignupModalProps = HTMLProps<HTMLDivElement> & AuthProps

const SignUp = ({
  className,
  providers,
  onAuthProviderSignup,
  onEmailSignup,
  onWalletSignup,
  ...props
}: SignupModalProps) => {
  const [step, setStep] = useState<Steps>('selectProvider')
  return (
    <div className={cn(styles.root, className)} {...props}>
      {step === 'selectProvider' && (
        <SelectProvider
          providers={providers}
          onWalletClick={onWalletSignup}
          onEmailClick={() => setStep('email')}
          onAuthProviderClick={onAuthProviderSignup}
        />
      )}
      {step === 'email' && (
        <EmailForm
          onGoBack={() => setStep('selectProvider')}
          onSubmit={(email) => onEmailSignup(email)}
        />
      )}
    </div>
  )
}

export default SignUp
