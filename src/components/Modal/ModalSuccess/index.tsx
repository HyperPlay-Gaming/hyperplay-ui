import React, { HTMLAttributes, PropsWithChildren } from 'react'

import classNames from 'classnames'

import { CloseButton } from '@/assets/images'
import Button from '@/components/Button'

import ModalAnimation from '../ModalAnimation'
import styles from './index.module.scss'

export interface ModalSuccessProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  isOpen: boolean
  onClose: () => void
  title: string
  callToActionText: string
  callToActionLink: string
  icon: React.ReactNode
}

const ModalSuccess = ({
  title,
  icon,
  callToActionText,
  callToActionLink,
  children,
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
          <div className={classNames(styles.row)}>{children}</div>
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
