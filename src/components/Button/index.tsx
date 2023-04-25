import React, { HTMLAttributes, PropsWithChildren, useRef } from 'react'

import classNames from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  type?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'danger' | 'menuItem'
  size?: 'small' | 'medium' | 'large'
  leftIcon?: JSX.Element
  rightIcon?: React.ReactNode
  fixedWidth?: number
  fullWidth?: boolean
  active?: boolean
  disabled?: boolean
}

export default function Button({
  type = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  children,
  active,
  disabled,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <button
      disabled={disabled}
      ref={buttonRef}
      className={classNames(
        styles.base,
        styles[type],
        styles[size],
        size === 'small' ? 'button-sm' : 'button',
        {
          [styles.link]: type === 'menuItem',
          'menu-item': type === 'menuItem',
          [styles.active]: active
        }
      )}
      {...props}
    >
      <div className={styles.content}>
        {leftIcon}
        <div className={styles.text}>{children}</div>
        {rightIcon}
      </div>
    </button>
  )
}
