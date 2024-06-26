import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { HyperPlayLogoColored, Wallet } from '@/assets/images'
import Alert, { AlertProps } from '@/components/Alert'
import { AuthProviderButton, getTruncatedAddress } from '@/index'

import Modal from '../Modal/Modal'
import styles from './LinkExternalAccounts.module.scss'

const SoonLabel = (
  <AuthProviderButton.Label className={styles.disabledLabel}>
    Soon
  </AuthProviderButton.Label>
)

interface ProviderOption {
  id: string
  name: string
  icon?: React.ReactNode
  connected?: boolean
  disabled?: boolean
}

interface AuthProps {
  alert?: AlertProps
  email?: string
  providers: ProviderOption[]
  onAuthProviderClick: (provider: ProviderOption) => void
  onWalletClick: () => void
  walletAddress?: string
}

interface I18n {
  hi: string
  title: string
  subtitle: string
}

export interface LinkExternalAccountsProps
  extends HTMLProps<HTMLDivElement>,
    AuthProps {
  onClose: () => void
  i18n?: I18n
}

export default function LinkExternalAccountsModal({
  alert,
  className,
  providers,
  onAuthProviderClick,
  onWalletClick,
  onClose,
  email,
  i18n = {
    hi: 'Hi',
    title: 'Add accounts to your HyperPlay profile',
    subtitle:
      'These accounts will not be shared outside of HyperPlay without your permission.'
  },
  walletAddress,
  ...props
}: LinkExternalAccountsProps) {
  let walletLabel

  if (walletAddress) {
    walletLabel = (
      <span className="caption color-neutral-400">
        {getTruncatedAddress(walletAddress, 3)}
      </span>
    )
  }

  return (
    <Modal.Root {...props} className={cn(className, styles.root)}>
      <Modal.CloseButton
        aria-label="close link accounts modal"
        onClick={onClose}
      />
      <HyperPlayLogoColored />
      <Modal.Header>
        {email ? (
          <Modal.Title>
            {i18n.hi} {email}
          </Modal.Title>
        ) : null}
        <Modal.Title>{i18n.title}</Modal.Title>
        <Modal.Body>{i18n.subtitle}</Modal.Body>
      </Modal.Header>
      {alert && <Alert {...alert}></Alert>}
      <div className={styles.providersContainer}>
        <AuthProviderButton
          name="Wallet"
          icon={<Wallet className={styles.icon} />}
          onClick={onWalletClick}
          connected={Boolean(walletAddress)}
          label={walletLabel}
        />
        {providers.map((provider) => (
          <AuthProviderButton
            key={provider.id}
            label={provider.disabled ? SoonLabel : undefined}
            onClick={() => onAuthProviderClick(provider)}
            {...provider}
          />
        ))}
      </div>
    </Modal.Root>
  )
}
