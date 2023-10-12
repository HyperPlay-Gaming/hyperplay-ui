import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'
import Modal from '@/components/Modal/Modal'

import styles from './CheckEmail.module.scss'

export interface CheckEmailProps extends HTMLProps<HTMLDivElement> {
  email: string
  onVerify: () => void
  onClose: () => void
  onResend: () => void
  i18n?: {
    title: string
    subtitle: string
    button: string
    didNotReceiveEmail: string
    resend: string
  }
}

const CheckEmail = ({
  className,
  email,
  onVerify,
  onResend,
  onClose,
  i18n = {
    title: 'Check your email',
    subtitle: 'We sent a verification link to',
    button: 'Verify email',
    didNotReceiveEmail: `Didn't receive an email?`,
    resend: 'Click to resend'
  },
  ...props
}: CheckEmailProps) => {
  return (
    <Modal.Root className={cn(className, styles.root)} {...props}>
      <Modal.CloseButton aria-label="close signup modal" onClick={onClose} />
      <Modal.HeadingIcon className={styles.emailRoundedIcon}>
        <Email className={styles.icon} width={20} height={20} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title>{i18n.title}</Modal.Title>
        <Modal.Body>
          {i18n.subtitle} <span className="text--semibold">{email}</span>
        </Modal.Body>
      </Modal.Header>
      <Button
        type="primary"
        size="medium"
        className={styles.verifyButton}
        onClick={onVerify}
      >
        {i18n.button}
      </Button>
      <div className={styles.linkContainer}>
        <span className={cn('button-sm', styles.subtitle)}>
          {i18n.didNotReceiveEmail}
        </span>
        &nbsp;
        <Button
          type="link"
          size="small"
          className={styles.buttonLink}
          onClick={onResend}
        >
          {i18n.resend}
        </Button>
      </div>
    </Modal.Root>
  )
}

export default CheckEmail
