import React, { HTMLProps, useEffect, useState } from 'react'

import cn from 'classnames'

import { HyperPlayLogoIcon } from '@/assets/images'
import Button from '@/components/Button'
import Collapse from '@/components/Collapse'
import Modal from '@/components/Modal/Modal'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './CheckEmail.module.scss'

export interface CheckEmailProps extends HTMLProps<HTMLDivElement> {
  email: string
  onClose: () => void
  onResend: () => void
  onReEnterEmail: () => void
  codeInputProps?: TextInputProps
  defaultManualOtpOpen?: boolean
  i18n?: {
    title: string
    subtitle: string
    clickLoginTitleOr: string
    redirectNotWorking: string
    didNotReceiveEmail: string
    resend: string
    retryIn: string
    seconds: string
    reEnterEmail: string
    manualCodeTitle: string
    inputPlaceHolder: string
  }
}

const CheckEmail = ({
  className,
  email,
  onResend,
  onReEnterEmail,
  codeInputProps,
  defaultManualOtpOpen,
  onClose,
  i18n = {
    title: 'Check your email',
    subtitle: "We've sent a verification link to",
    clickLoginTitleOr: 'Click the link to login or',
    didNotReceiveEmail: `Didn't get an email?`,
    redirectNotWorking: 'Redirect not working?',
    resend: 'Resend email',
    retryIn: 'Retry in',
    seconds: 'seconds',
    reEnterEmail: 'change email',
    manualCodeTitle: 'Login Code',
    inputPlaceHolder: 'Paste login code'
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
        <HyperPlayLogoIcon className={styles.icon} width={20} height={20} />
      </Modal.HeadingIcon>
      <Modal.Header>
        <Modal.Title>{i18n.title}</Modal.Title>
        <Modal.Body className={'body-sm'}>
          {i18n.subtitle} <span className="text--semibold">{email}</span>.{' '}
          {i18n.clickLoginTitleOr}{' '}
          <Button
            type="link"
            className={styles.reEnter}
            onClick={onReEnterEmail}
          >
            {i18n?.reEnterEmail}.
          </Button>
        </Modal.Body>
      </Modal.Header>
      <div className={styles.copyCodeContainer}>
        <span className="eyebrow">{i18n.redirectNotWorking}</span>
        <Collapse
          title={i18n.manualCodeTitle}
          classNames={{
            root: styles.collapseRoot,
            content: styles.collapseContent
          }}
          defaultOpen={defaultManualOtpOpen}
        >
          <TextInput
            className={styles.input}
            placeholder={i18n.inputPlaceHolder}
            {...codeInputProps}
          />
        </Collapse>
      </div>
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
