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

type withIcon = React.ReactNode
type withDot = {
  dotColor: 'success' | 'error' | 'warning' | 'neutral' | 'tertiary'
  dotIcon?: React.ElementType
}
type Dimension = 'default' | 'small'
type Variant = 'outlined' | 'filled' | 'filledStrong'

export interface StickerProps extends HTMLProps<HTMLDivElement> {
  styleType?: StyleType
  withIcon?: withIcon
  withDot?: withDot
  dotColor?: withDot['dotColor']
  dimension?: Dimension
  variant?: Variant
}

export default function Sticker({
  styleType = 'secondary',
  variant = 'outlined',
  dimension = 'default',
  withIcon,
  withDot,
  className,
  children,
  ...props
}: StickerProps) {
  const divClasses = {
    [styles.neutral]: styleType === 'neutral',
    [styles.secondary]: styleType === 'secondary',
    [styles.tertiary]: styleType === 'tertiary',
    [styles.success]: styleType === 'success',
    [styles.warning]: styleType === 'warning',
    [styles.error]: styleType === 'error',
    [styles.sizeDefault]: dimension === 'default',
    [styles.sizeSmall]: dimension === 'small',
    [styles.icon]: withIcon,
    [styles.dot]: withDot?.dotColor,
    [styles.outlined]: variant === 'outlined',
    [styles.filled]: variant === 'filled',
    [styles.filledStrong]: variant === 'filledStrong'
  }

  return (
    <div
      {...props}
      className={classNames(styles.sticker, className, divClasses)}
    >
      {withIcon && <span className={styles.icon}>{withIcon}</span>}
      {withDot && (
        <span className={styles.dot} data-status={withDot.dotColor}>
          {withDot.dotIcon && typeof withDot.dotIcon === 'function'
            ? React.createElement(withDot.dotIcon)
            : null}
        </span>
      )}
      {children}
    </div>
  )
}
