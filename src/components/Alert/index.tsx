import React, { HTMLProps } from 'react'

import {
  AlertTriangle,
  CheckmarkCircleOutline,
  InfoIcon,
  AlertOctagon,
  LightningOutlined,
  CloseButton
} from '@/assets/images'

import cs from 'classnames'
import Button from '@/components/Button'
import styles from './index.module.scss'

type Variants = 'warning' | 'danger' | 'info' | 'success' | 'neutral' | 'brand'

const icons: Record<Variants, typeof AlertTriangle> = {
  warning: AlertTriangle,
  danger: AlertOctagon,
  info: InfoIcon,
  success: CheckmarkCircleOutline,
  neutral: LightningOutlined,
  brand: LightningOutlined
}

export interface AlertProps extends HTMLProps<HTMLDivElement> {
  variant?: Variants
  message: string
  button?: React.ReactNode
  classNames?: {
    root?: string
    title?: string
    message?: string
    icon?: string
    button?: string
    closeButton?: string
  }
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Alert = ({
  variant = 'info',
  message,
  button,
  onClose,
  classNames,
  className,
  ...props
}: AlertProps) => {
  const Icon = icons[variant]
  return (
    <div
      className={cs(styles.base, styles[variant], className, classNames?.root)}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <Icon className={cs(styles.icon, classNames?.icon)} />
          <p className={cs(styles.message, 'eyebrow', classNames?.message)}>
            {message}
          </p>
        </div>
        {button ? (
          <Button
            type="secondary-neutral"
            size="small"
            onClick={onClose}
            className={styles.button}
          >
            {button}
          </Button>
        ) : null}
      </div>
      <button
        type="button"
        className={cs(styles.closeButton, classNames?.closeButton)}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseButton />
      </button>
    </div>
  )
}

export default Alert
