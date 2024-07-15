import React, { HTMLProps, useEffect, useState } from 'react'

import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'
import Modal from '@/components/Modal/Modal'

import styles from './CheckEmail.module.scss'

export interface CheckEmailProps extends HTMLProps<HTMLDivElement> {
  email: string
  onClose: () => void
  onResend: () => void
  onReEnterEmail: () => void
  i18n?: {
    title: string
    subtitle: string
    didNotReceiveEmail: string
    resend: string
    retryIn: string
    seconds: string
    reEnterEmail: string
  }
}

const CheckEmail = ({
  className,
  email,
  onResend,
  onReEnterEmail,
  onClose,
  i18n = {
    title: 'Check your email',
    subtitle: 'We sent a verification link to',
    didNotReceiveEmail: `Didn't receive an email?`,
    resend: 'Click to resend',
    retryIn: 'Retry in',
    seconds: 'seconds',
    reEnterEmail: 'Re-enter email your email'
  },
  ...props
}: CheckEmailProps) => {
  const [timeOut, setTimeOut] = useState(0)
  const isDisabled = timeOut > 0

  const handleResend = () => {
    if (isDisabled) return
    onResend()
    setTimeOut(15)
  }

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>

    if (isDisabled) {
      interval = setInterval(() => {
        setTimeOut((prevTimeOut) => prevTimeOut - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isDisabled])

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
        <Button
          type="tertiary"
          className={styles.reEnter}
          onClick={onReEnterEmail}
        >
          {i18n?.reEnterEmail}
        </Button>
      </Modal.Header>
      <div className={styles.linkContainer}>
        <span className={cn('button-sm', styles.subtitle)}>
          {i18n.didNotReceiveEmail}
        </span>
        &nbsp;
        {isDisabled ? (
          <span
            className={cn('button-sm', styles.subtitle, styles.disabledText)}
          >
            {i18n.retryIn} {timeOut} {i18n.seconds}
          </span>
        ) : (
          <>
            <Button
              type="link"
              size="small"
              className={styles.buttonLink}
              onClick={handleResend}
            >
              {i18n.resend}
            </Button>
          </>
        )}
      </div>
    </Modal.Root>
  )
}

export default CheckEmail
