import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { HyperPlayLogoColored, Wallet } from '@/assets/images'
import Alert, { AlertProps } from '@/components/Alert'
import { AuthProviderButton } from '@/index'

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
  providers: ProviderOption[]
  onAuthProviderClick: (provider: ProviderOption) => void
  onWalletClick: () => void
  walletLinked?: boolean
}

interface I18n {
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
  i18n = {
    title: 'Add accounts to your HyperPlay profile',
    subtitle:
      'These accounts will not be shared outside of HyperPlay without your permission.'
  },
  walletLinked,
  ...props
}: LinkExternalAccountsProps) {
  return (
    <Modal.Root {...props} className={cn(className, styles.root)}>
      <Modal.CloseButton
        aria-label="close link accounts modal"
        onClick={onClose}
      />
      <HyperPlayLogoColored />
      <Modal.Header>
        <Modal.Title>{i18n.title}</Modal.Title>
        <Modal.Body>{i18n.subtitle}</Modal.Body>
      </Modal.Header>
      {alert && <Alert {...alert}></Alert>}
      <div className={styles.providersContainer}>
        <AuthProviderButton
          name="Wallet"
          icon={<Wallet className={styles.icon} />}
          onClick={onWalletClick}
          connected={walletLinked}
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