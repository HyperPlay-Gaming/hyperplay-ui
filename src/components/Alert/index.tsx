import React, { HTMLProps } from 'react'

import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck
} from '@tabler/icons-react'
import cs from 'classnames'

import styles from './index.module.scss'

type Variants = 'warning' | 'danger' | 'info' | 'success'

const icons: Record<Variants, typeof IconAlertCircle> = {
  warning: IconAlertTriangle,
  danger: IconAlertCircle,
  info: IconCircleCheck,
  success: IconCircleCheck
}

export interface AlertProps extends HTMLProps<HTMLDivElement> {
  variant?: Variants
  message: string
  classNames?: {
    root?: string
    message?: string
    icon?: string
  }
}

const Alert = ({
  variant = 'info',
  message,
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
      {Icon && <Icon className={cs(styles.icon, classNames?.icon)} />}
      <span className={cs(classNames?.message)}>{message}</span>
    </div>
  )
}

export default Alert
