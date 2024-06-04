import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef
} from 'react'

import classNames from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  type?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'link'
    | 'danger'
    | 'menuItem'
    | 'alert'
    | 'secondaryGradient'
  colorDirection?:
    | 'to top'
    | 'to bottom'
    | 'to left'
    | 'to right'
    | 'to center'
    | 'from top'
    | 'from bottom'
    | 'from left'
    | 'from right'
  size?: 'small' | 'medium' | 'large' | 'icon'
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  leftIcon?: JSX.Element
  rightIcon?: React.ReactNode
  active?: boolean
  disabled?: boolean
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type = 'primary',
    size = 'medium',
    colorDirection = 'to top',
    leftIcon,
    rightIcon,
    children,
    active,
    disabled,
    htmlType,
    className: propClassName,
    spacing = 'md',
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <button
      disabled={disabled}
      ref={ref}
      type={htmlType}
      style={
        {
          ...(props.style || {}),
          '--color-direction': colorDirection
        } as React.CSSProperties
      }
      className={classNames(
        styles.base,
        styles[type],
        styles[size],
        size === 'small' ? 'button-sm' : 'button',
        {
          [styles.link]: type === 'menuItem',
          'menu-item': type === 'menuItem',
          [styles.active]: active
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
})

export default Button
