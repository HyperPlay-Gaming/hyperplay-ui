import React, { ButtonHTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'link'
    | 'danger'
    | 'menuItem'
  size?: 'small' | 'medium' | 'large' | 'icon'
  leftIcon?: JSX.Element
  rightIcon?: React.ReactNode
  active?: boolean
  disabled?: boolean
}

// TODO: this is a temporary fix we need to fully replace the old Button component when we decide to use the new one everywhere
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'medium',
    leftIcon,
    rightIcon,
    children,
    active,
    disabled,
    className: propClassName,
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <button
      disabled={disabled}
      ref={ref}
      className={classNames(
        styles.base,
        styles[variant],
        styles[size],
        size === 'small' ? 'button-sm' : 'button',
        {
          [styles.link]: variant === 'menuItem',
          'menu-item': variant === 'menuItem',
          [styles.active]: active
        },
        propClassName
      )}
      {...props}
    >
      <div className={styles.content}>
        {leftIcon}
        {children}
        {rightIcon}
      </div>
    </button>
  )
})

export default Button
