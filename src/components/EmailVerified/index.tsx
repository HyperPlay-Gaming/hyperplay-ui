import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'

import styles from './EmailVerified.module.scss'

export interface EmailVerifiedModalProps extends HTMLProps<HTMLDivElement> {
  onContinue: () => void
}

const EmailVerifiedModal = ({
  onContinue,
  className,
  ...props
}: EmailVerifiedModalProps) => {
  return (
    <div className={cn(className, styles.root)} {...props}>
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <div>
        <h6 className={styles.title}>Email verified</h6>
        <span className={cn('body', styles.subtitle)}>
          Congratulations! Your email has been verified.
        </span>
      </div>
      <Button
        type="primary"
        size="medium"
        className={styles.button}
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  )
}

export default EmailVerifiedModal
