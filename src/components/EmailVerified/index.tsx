import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'
import Modal from '@/components/Modal/Modal'

import styles from './EmailVerified.module.scss'

export interface EmailVerifiedModalProps extends HTMLProps<HTMLDivElement> {
  onContinue: () => void
  onClose: () => void
  i18n?: {
    title: string
    subtitle: string
    button: string
  }
}

const EmailVerifiedModal = ({
  onContinue,
  onClose,
  className,
  i18n = {
    title: 'Email verified',
    subtitle: 'Congratulations! Your email has been verified.',
    button: 'Continue'
  },
  ...props
}: EmailVerifiedModalProps) => {
  return (
    <Modal.Content className={cn(className, styles.root)} {...props}>
      <Modal.CloseButton aria-label="email verified modal" onClick={onClose} />
      <Modal.HeadingIcon className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title>{i18n.title}</Modal.Title>
        <Modal.Body>{i18n.subtitle}</Modal.Body>
      </Modal.Header>
      <Button
        type="primary"
        size="medium"
        className={styles.button}
        onClick={onContinue}
      >
        {i18n.button}
      </Button>
    </Modal.Content>
  )
}

export default EmailVerifiedModal
