import React from 'react'

import { ModalProps } from '@mantine/core'
import cn from 'classnames'

import { Email } from '@/assets/images'
import Button from '@/components/Button'
import PopUpModal from '@/components/PopUpModal'

import styles from './EmailVerifiedModal.module.scss'

export interface EmailVerifiedModalProps extends ModalProps {
  onContinue: () => void
}

const EmailVerifiedModal = ({
  onContinue,
  onClose,
  ...props
}: EmailVerifiedModalProps) => {
  return (
    <PopUpModal {...props} onClose={onClose} size={600}>
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
    </PopUpModal>
  )
}

export default EmailVerifiedModal
