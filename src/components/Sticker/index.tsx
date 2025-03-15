import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

type StyleType =
  | 'neutral'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
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

export default function Sticker({
  styleType = 'secondary',
  variant = 'outlined',
  size = 'default',
  className,
  withIcon,
  withDot,
  iconClassName,
  dotClassName,
  children,
  ...props
}: StickerProps) {
  const divClasses: Record<string, string | boolean | undefined> = {
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
    [styles.sizeSmall]: size === 'small',
    [styles.icon]: iconClassName,
    [styles.dot]: dotClassName
  }

  return (
    <div
      {...props}
      className={classNames(styles.sticker, className, divClasses)}
    >
      {withIcon && <span className={styles.icon}>{withIcon}</span>}
      {withDot && <span className={classNames(styles.dot)}>{withDot}</span>}
      {children}
    </div>
  )
}
