/* eslint-disable @typescript-eslint/no-empty-function */
import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import { CloseButton, RightArrow, WarningIcon } from '@/assets/images'
import Button from '@/components/Button'

import styles from './index.module.scss'

type Variants = 'warning' | 'danger'

export interface InfoAlertProps extends HTMLProps<HTMLDivElement> {
  title: string
  message: string
  actionText?: string
  onClose?: () => void
  onActionClick?: () => void
  variant: Variants
  isOpen?: boolean
  showClose?: boolean
  icon?: JSX.Element
}

export default function Alert({
  title,
  message,
  actionText,
  onClose = () => {},
  onActionClick = () => {},
  variant,
  isOpen = true,
  showClose = true,
  icon,
  ...props
}: InfoAlertProps) {
  return (
    <div
      className={classNames(styles.container, styles[variant], {
        [styles.closed]: !isOpen
      })}
      {...props}
    >
      <div className={styles.icon}>{icon ?? <WarningIcon />}</div>
      <div className={styles.text}>
        <div className={classNames('button', styles.title)}>{title}</div>
        <div
          className={classNames(
            {
              'body-small': variant === 'warning',
              body: variant === 'danger'
            },
            styles.message
          )}
        >
          {message}
        </div>
      </div>
      {showClose ? (
        <div className={styles.close}>
          <CloseButton onClick={onClose} />
        </div>
      ) : null}
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
