import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface StickerProps extends HTMLProps<HTMLDivElement> {
  styleType: 'secondary' | 'warning'
  variant: 'filled' | 'default' | 'outlined'
}

export default function Sticker({
  styleType,
  variant,
  className,
  ...props
}: StickerProps) {
  const divClasses: Record<string, boolean> = {}
  divClasses[styles.secondary] = styleType === 'secondary'
  divClasses[styles.warning] = styleType === 'warning'
  divClasses[styles.outlined] = variant === 'outlined'
  divClasses[styles.filled] = variant === 'filled'
  return (
    <div
      {...props}
      className={classNames(styles.sticker, className, divClasses)}
    >
      {props.children}
    </div>
  )
}
