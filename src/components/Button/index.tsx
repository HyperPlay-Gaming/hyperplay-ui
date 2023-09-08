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
  type?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'danger' | 'menuItem'
  size?: 'small' | 'medium' | 'large' | 'icon'
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  leftIcon?: JSX.Element
  rightIcon?: React.ReactNode
  active?: boolean
  disabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type = 'primary',
    size = 'medium',
    leftIcon,
    rightIcon,
    children,
    active,
    disabled,
    htmlType,
    className: propClassName,
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <button
      disabled={disabled}
      ref={ref}
      type={htmlType}
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
      <div className={styles.content}>
        {leftIcon}
        {children}
        {rightIcon}
      </div>
    </button>
  )
})

export default Button
