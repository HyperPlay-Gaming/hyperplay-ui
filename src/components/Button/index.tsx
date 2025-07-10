import React, { ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type'
  > {
  type?:
    | 'brand'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'primary-neutral'
    | 'secondary-neutral'
    | 'tertiary-neutral'
    | 'link'
    | 'danger'
    | 'danger-secondary'
    | 'danger-tertiary'
    | 'menuItem'
    | 'alert'
    | 'secondaryGradient'
  size?: 'small' | 'medium' | 'large' | 'icon'
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  leftIcon?: React.JSX.Element
  rightIcon?: React.ReactNode
  active?: boolean
  focusVisible?: boolean
  hover?: boolean
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function Button({
  type = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  children,
  active,
  disabled,
  htmlType,
  className: propClassName,
  spacing = 'md',
  style,
  focusVisible,
  hover,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={htmlType}
      style={style}
      data-testid="button"
      className={classNames(
        styles.base,
        styles[type],
        styles[size],
        size === 'small' ? 'button-sm' : 'button',
        {
          [styles.link]: type === 'menuItem',
          'menu-item': type === 'menuItem',
          [styles.active]: active,
          [styles.focusVisible]: focusVisible,
          [styles.hover]: hover,
          hover: hover
        },
        propClassName
      )}
      {...props}
    >
      <div
        className={styles.content}
        style={{ gap: `var(--space-${spacing}-fixed)` }}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </div>
    </button>
  )
}
