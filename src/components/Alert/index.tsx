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
}

const Alert = ({ variant = 'info', message, ...props }: AlertProps) => {
  const Icon = icons[variant]
  return (
    <div className={cs(styles.base, styles[variant])} {...props}>
      {Icon && <Icon className={styles.icon} />}
      <span>{message}</span>
    </div>
  )
}

export default Alert
