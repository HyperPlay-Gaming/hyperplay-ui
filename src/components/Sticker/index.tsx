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

type DotColor = 'success' | 'error' | 'warning' | 'neutral' | 'tertiary'

type StyleCategory =
  | { variant: 'withIcon'; icon: React.ReactNode }
  | {
      variant: 'withDot'
      dotColor: DotColor
      dotIcon?: React.ReactNode
    }

type Dimension = 'default' | 'small'

type Variant = 'outlined' | 'filled' | 'filledStrong'

export interface StickerProps extends HTMLProps<HTMLDivElement> {
  styleType?: StyleType
  styleCategory?: StyleCategory
  dimension?: Dimension
  variant?: Variant
}

export default function Sticker({
  styleType = 'secondary',
  styleCategory = { variant: 'withIcon' } as StyleCategory,
  dimension = 'default',
  variant = 'outlined',
  className,
  children,
  ...props
}: StickerProps) {
  const divClasses: Record<
    string,
    string | boolean | undefined | React.ReactNode
  > = {
    [styles.neutral]: styleType === 'neutral',
    [styles.secondary]: styleType === 'secondary',
    [styles.tertiary]: styleType === 'tertiary',
    [styles.success]: styleType === 'success',
    [styles.warning]: styleType === 'warning',
    [styles.error]: styleType === 'error',
    [styles.sizeDefault]: dimension === 'default',
    [styles.sizeSmall]: dimension === 'small',
    [styles.icon]: styleCategory.variant === 'withIcon',
    [styles.dot]: styleCategory.variant === 'withDot',
    [styles.outlined]: variant === 'outlined',
    [styles.filled]: variant === 'filled',
    [styles.filledStrong]: variant === 'filledStrong'
  }

  return (
    <div
      {...props}
      className={classNames(styles.sticker, className, divClasses)}
    >
      {styleCategory.variant === 'withIcon' && (
        <span className={styles.icon}>{styleCategory.icon}</span>
      )}
      {styleCategory.variant === 'withDot' && (
        <span
          className={classNames(styles.dot)}
          data-status={styleCategory.dotColor}
        >
          {styleCategory.dotIcon}
        </span>
      )}
      {children}
    </div>
  )
}
