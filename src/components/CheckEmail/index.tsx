import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'

import styles from './CheckEmail.module.scss'

export interface CheckEmailProps extends HTMLProps<HTMLDivElement> {
  email: string
  onVerify: () => void
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
    <div className={cn(styles.root, className)} {...props}>
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <div>
        <h6 className={styles.title}>{i18n.title}</h6>
        <span className={cn('body', styles.subtitle)}>
          {i18n.subtitle} <span className="text--semibold">{email}</span>
        </span>
      </div>
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
    </div>
  )
}

export default CheckEmail
