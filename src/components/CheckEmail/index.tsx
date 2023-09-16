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
    title?: string
    subtitle?: string
    button?: string
    didNotReceiveEmail?: string
    resend?: string
  }
}

const CheckEmail = ({
  className,
  email,
  onVerify,
  onResend,
  i18n,
  ...props
}: CheckEmailProps) => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <div>
        <h6 className={styles.title}>{i18n?.title ?? 'Check your email'}</h6>
        <span className={cn('body', styles.subtitle)}>
          {i18n?.subtitle ?? 'We sent a verification link to'}{' '}
          <span className="text--semibold">{email}</span>
        </span>
      </div>
      <Button
        type="primary"
        size="medium"
        className={styles.verifyButton}
        onClick={onVerify}
      >
        {i18n?.button ?? 'Verify email'}
      </Button>
      <div className={styles.linkContainer}>
        <span className={cn('button-sm', styles.subtitle)}>
          {i18n?.didNotReceiveEmail ?? `Didn't receive an email?`}
        </span>
        &nbsp;
        <Button
          type="link"
          size="small"
          className={styles.buttonLink}
          onClick={onResend}
        >
          {i18n?.resend ?? 'Click to resend'}
        </Button>
      </div>
    </div>
  )
}

export default CheckEmail
