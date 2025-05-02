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
  style?: React.CSSProperties
  size?: 'small' | 'medium' | 'large' | 'icon'
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  leftIcon?: JSX.Element
  rightIcon?: React.ReactNode
  active?: boolean
  disabled?: boolean
  focusVisible?: boolean
  hover?: boolean
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function getButtonsClassNames({
  type = 'primary',
  size = 'medium',
  active,
  className: propClassName,
  focusVisible,
  hover
}: ButtonProps & {
  className?: string
}) {
  return classNames(
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
  )
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
    spacing = 'md',
    style,
    focusVisible,
    hover,
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <button
      disabled={disabled}
      ref={ref}
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
})

export default Button
