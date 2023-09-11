import React from 'react'

import classNames from 'classnames'

import { CloseButton } from '@/assets/images'
import Button from '@/components/Button'

import ModalAnimation from '../ModalAnimation'
import styles from './index.module.scss'

export interface ModalSuccessProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  callToActionText: string
  callToActionLink: string
  icon: React.ReactNode
}

const ModalSuccess = ({
  title,
  message,
  icon,
  callToActionText,
  callToActionLink,
  ...props
}: ModalSuccessProps) => {
  return (
    <ModalAnimation {...props}>
      <div className={classNames(styles.modal)} data-testid="success-modal">
        <div className={classNames(styles.content)}>
          <div className={styles.close}>
            <CloseButton onClick={props.onClose} />
          </div>
          <div className={classNames(styles.row)}>
            <h5 className={styles.title}>{title}</h5>
          </div>
          <div className={classNames(styles.row)}>
            <div className={classNames(styles.icon)}>{icon}</div>
          </div>
          <div className={classNames(styles.row)}>
            <h6>{message}</h6>
          </div>
          <div className={classNames(styles.row)}>
            <a href={`${callToActionLink}`}>
              <Button type="secondary">
                <div className={styles.button}>{callToActionText}</div>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </ModalAnimation>
  )
}

export default ModalSuccess
