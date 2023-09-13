import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'

import styles from './CheckEmail.module.scss'

export interface CheckEmailProps extends HTMLProps<HTMLDivElement> {
  email: string
  onVerify: () => void
  onResend: () => void
}

const CheckEmail = ({
  className,
  email,
  onVerify,
  onResend,
  ...props
}: CheckEmailProps) => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      <div className={styles.emailRoundedIcon}>
        <Email className={styles.icon} />
      </div>
      <div>
        <h6 className={styles.title}>Check your email</h6>
        <span className={cn('body', styles.subtitle)}>
          We sent a verification link to{' '}
          <span className="text--semibold">{email}</span>
        </span>
      </div>
      <Button
        type="primary"
        size="medium"
        className={styles.verifyButton}
        onClick={onVerify}
      >
        Verify email
      </Button>
      <div className={styles.linkContainer}>
        <span className={cn('button-sm', styles.subtitle)}>
          {`Didn't receive an email?`}
        </span>
        &nbsp;
        <Button
          type="link"
          size="small"
          className={styles.buttonLink}
          onClick={onResend}
        >
          Click to resend
        </Button>
      </div>
    </div>
  )
}

export default CheckEmail
