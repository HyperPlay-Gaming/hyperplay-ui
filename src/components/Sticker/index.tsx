import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface StickerProps extends HTMLProps<HTMLDivElement> {
  styleType:
    | 'neutral'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'error'
  variant: 'filled' | 'default' | 'outlined' | 'filledStrong'
}

export default function Sticker({
  styleType,
  variant,
  className,
  ...props
}: StickerProps) {
  const divClasses: Record<string, boolean> = {}
  divClasses[styles.neutral] = styleType === 'neutral'
  divClasses[styles.secondary] = styleType === 'secondary'
  divClasses[styles.tertiary] = styleType === 'tertiary'
  divClasses[styles.success] = styleType === 'success'
  divClasses[styles.warning] = styleType === 'warning'
  divClasses[styles.error] = styleType === 'error'
  divClasses[styles.outlined] = variant === 'outlined'
  divClasses[styles.filled] = variant === 'filled'
  divClasses[styles.filledStrong] = variant === 'filledStrong'
  return (
    <div
      {...props}
      className={classNames(styles.sticker, className, divClasses)}
    >
      {props.children}
    </div>
  )
}
