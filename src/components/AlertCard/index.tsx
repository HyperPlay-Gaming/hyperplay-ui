/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import classNames from 'classnames'
import Button from '@/components/Button'
import styles from './index.module.scss'
import { ReactComponent as CloseButton } from '@/assets/images/CloseButton.svg'

type Variant =
  | 'error'
  | 'warning'
  | 'success'
  | 'information'
  | 'neutral'
  | 'brand'
type Size = 'small' | 'large'
type Layout = 'horizontal' | 'vertical'

export interface InfoAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  message: React.ReactNode
  onClose?: () => void
  variant: Variant
  size?: Size
  layout?: Layout
  isOpen?: boolean
  showClose?: boolean
  closeButton?: React.ReactNode
  showIcon?: boolean
  icon?: React.ReactNode
  iconContainer?: boolean
  listItems?: string[] | null
  link?: {
    text: string
    onClick: () => void
  }
  buttons?: {
    primary?: {
      text: string
      onClick: () => void
    }
    secondary?: {
      text: string
      onClick: () => void
    }
    tertiary?: {
      text: string
      onClick: () => void
    }
  }
  noBorderLeft?: boolean
  className?: string
}

export default function Alert({
  title,
  message,
  onClose = () => {},
  variant,
  size = 'small',
  layout = 'horizontal',
  isOpen = true,
  showClose = true,
  closeButton = <CloseButton />,
  showIcon = true,
  icon,
  iconContainer = false,
  listItems,
  link,
  buttons,
  noBorderLeft = false,
  className,
  ...props
}: InfoAlertProps) {
  if (!isOpen) return null

  return (
    <div
      className={classNames(
        styles.container,
        styles[variant],
        styles[size],
        styles[layout],
        {
          [styles.noBorderLeft]: noBorderLeft,
          [styles.iconContainer]: iconContainer
        },
        className
      )}
      {...props}
    >
      {showClose ? (
        <button type="button" onClick={onClose} className={styles.closeButton}>
          {closeButton}
        </button>
      ) : null}
      {showIcon ? <div className={styles.icon}>{icon}</div> : null}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.message}>{message}</div>

        {listItems ? (
          <ul className={styles.list}>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null}

        {link ? (
          <div className={styles.link}>
            <Button type="link" size="small" onClick={link.onClick}>
              {link.text}
            </Button>
          </div>
        ) : null}

        {buttons ? (
          <div className={styles.buttonGroup}>
            {buttons.primary && (
              <Button
                type="primary"
                size="small"
                onClick={buttons.primary.onClick}
              >
                {buttons.primary.text}
              </Button>
            )}
            {buttons.secondary && (
              <Button
                type="secondary"
                size="small"
                onClick={buttons.secondary.onClick}
              >
                {buttons.secondary.text}
              </Button>
            )}
            {buttons.tertiary && (
              <Button
                type="tertiary"
                size="small"
                onClick={buttons.tertiary.onClick}
              >
                {buttons.tertiary.text}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
