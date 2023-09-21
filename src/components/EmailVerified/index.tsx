import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'

import styles from './EmailVerified.module.scss'

export interface EmailVerifiedModalProps extends HTMLProps<HTMLDivElement> {
  onContinue: () => void
  i18n?: {
    title: string
    subtitle: string
    button: string
  }
}

const EmailVerifiedModal = ({
  onContinue,
  className,
  i18n = {
    title: 'Email verified',
    subtitle: 'Congratulations! Your email has been verified.',
    button: 'Continue'
  },
  ...props
}: EmailVerifiedModalProps) => {
  return (
    <div className={cn(className, styles.root)} {...props}>
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <div>
        <h6 className={styles.title}>{i18n.title}</h6>
        <span className={cn('body', styles.subtitle)}>{i18n.subtitle}</span>
      </div>
      <Button
        type="primary"
        size="medium"
        className={styles.button}
        onClick={onContinue}
      >
        {i18n.button}
      </Button>
    </div>
  )
}

export default EmailVerifiedModal
