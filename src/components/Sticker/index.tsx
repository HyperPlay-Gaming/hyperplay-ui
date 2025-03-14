import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import { AlertTriangle, CheckmarkCircle, Info, XCircle } from '@/assets/images'

import styles from './index.module.scss'

type StyleType =
  | 'neutral'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
type Variant = 'outlined' | 'filled' | 'filledStrong'
type Size = 'default' | 'small'
type WithIcon = React.ReactNode
type WithDot = React.ReactNode

export interface StickerProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  styleType?: StyleType
  variant?: Variant
  size?: Size
  withIcon?: WithIcon
  withDot?: WithDot
  iconClassName?: string
  dotClassName?: string
  className?: string
  children?: React.ReactNode
}

const getDefaultIcon = (styleType: StyleType) => {
  switch (styleType) {
    case 'success':
      return <CheckmarkCircle />
    case 'warning':
      return <AlertTriangle />
    case 'error':
      return <XCircle />
    case 'tertiary':
    case 'info':
      return <Info />
    default:
      return null
  }
}

export default function Sticker({
  styleType = 'secondary',
  variant = 'outlined',
  size = 'default',
  className,
  withIcon,
  withDot,
  children,
  ...props
}: StickerProps) {
  const divClasses: Record<string, boolean> = {
    [styles.neutral]: styleType === 'neutral',
    [styles.secondary]: styleType === 'secondary',
    [styles.tertiary]: styleType === 'tertiary',
    [styles.success]: styleType === 'success',
    [styles.warning]: styleType === 'warning',
    [styles.error]: styleType === 'error',
    [styles.outlined]: variant === 'outlined',
    [styles.filled]: variant === 'filled',
    [styles.filledStrong]: variant === 'filledStrong',
    [styles.sizeDefault]: size === 'default',
    [styles.sizeSmall]: size === 'small'
  }

  const iconToRender = withIcon || getDefaultIcon(styleType)

  return (
    <div
      {...props}
      className={classNames(styles.sticker, className, divClasses)}
    >
      {iconToRender && <span className={styles.icon}>{iconToRender}</span>}
      {withDot && <span className={classNames(styles.dot)}>{withDot}</span>}
      {children}
    </div>
  )
}
