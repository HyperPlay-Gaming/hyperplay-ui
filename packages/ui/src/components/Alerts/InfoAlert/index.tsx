/* eslint-disable @typescript-eslint/no-empty-function */
import React, { HTMLProps } from 'react'
import { CloseButton, RightArrow, WarningIcon } from '../../../assets/images'
import Button from '../../Button'
import { BodySmall } from '../../Typography'

import styles from './index.module.scss'

interface InfoAlertProps extends HTMLProps<HTMLDivElement> {
  title: string
  message: string
  actionText?: string
  onClose?: () => void
  onActionClick?: () => void
}

export default function InfoAlert({
  title,
  message,
  actionText,
  onClose = () => {},
  onActionClick = () => {},
  ...props
}: InfoAlertProps) {
  return (
    <div className={styles.container} {...props}>
      <div className={styles.icon}>
        <WarningIcon />
      </div>
      <div className={styles.text}>
        <div className="button">{title}</div>
        <BodySmall>{message}</BodySmall>
      </div>
      <div className={styles.close}>
        <CloseButton onClick={onClose} />
      </div>
      <div className={styles.message}></div>
      {actionText && (
        <div className={styles.action}>
          <Button
            rightIcon={<RightArrow />}
            onClick={onActionClick}
            type="link"
            size="small"
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  )
}
