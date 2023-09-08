import React from 'react'

import { ModalProps } from '@mantine/core'
import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'
import PopUpModal from '@/components/PopUpModal'

import styles from './CheckEmailModal.module.scss'

export interface CheckEmailModalProps extends ModalProps {
  email: string
  onResend: () => void
}

const CheckEmailModal = ({
  email,
  onResend,
  onClose,
  ...props
}: CheckEmailModalProps) => {
  return (
    <PopUpModal {...props} onClose={onClose} size={600}>
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
      <Button type="primary" size="medium" className={styles.verifyButton}>
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
    </PopUpModal>
  )
}

export default CheckEmailModal
