import React, { PropsWithChildren, useRef } from 'react'
import { useMeasure } from 'react-use'

import classNames from 'classnames'

import * as icons from '@/assets/images'
import useIsBrowser from '@/utils/useIsBrowser'

import styles from './Button.module.scss'
import PrimaryBackground from './components/PrimaryBackground'

type IconKeys = keyof typeof icons
export interface ButtonProps extends PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'menuItem'
  borderVariant?: 'rounded' | 'semi-rounded'
  size?: 'large' | 'medium'
  status?: 'success' | 'error'
  leftIcon?: IconKeys
  rightIcon?: IconKeys
  onClick?: () => void
  fixedWidth?: number
  fullWidth?: boolean
  active?: boolean
  disabled?: boolean
  loading?: boolean | number
}

export default function Button({
  variant = 'primary',
  borderVariant = 'semi-rounded',
  size = 'large',
  status,
  leftIcon,
  rightIcon,
  children,
  fixedWidth,
  fullWidth,
  active,
  disabled,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {}
}: ButtonProps) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const widthStyle = fullWidth
    ? '100%'
    : fixedWidth
    ? fixedWidth
    : 'fit-content'
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isBrowser = useIsBrowser()

  const LeftIcon = leftIcon ? icons[leftIcon] : null
  const RightIcon = rightIcon ? icons[rightIcon] : null

  return (
    <div
      ref={ref}
      style={{
        width: widthStyle,
        height: 'fit-content'
      }}
    >
      <button
        onClick={onClick}
        ref={buttonRef}
        disabled={disabled}
        className={classNames(
          styles.base,
          styles[variant],
          styles[size],
          styles[borderVariant],
          status && styles[status],
          {
            'ui-button--sm': size === 'medium',
            'ui-button': size === 'large',
            [styles.link]: variant === 'menuItem',
            'menu-item': variant === 'menuItem',
            [styles.active]: active
          }
        )}
        style={{ width: widthStyle }}
      >
        <div className={styles.content}>
          {LeftIcon && (
            <LeftIcon
              className={classNames(
                styles.icon,
                styles.leftIcon,
                styles[borderVariant],
                styles[size]
              )}
            />
          )}
          <div className={styles.text}>{children}</div>
          {RightIcon && (
            <RightIcon
              className={classNames(
                styles.icon,
                styles.rightIcon,
                styles[borderVariant],
                styles[size]
              )}
            />
          )}
        </div>
        {isBrowser && variant === 'primary' && (
          <PrimaryBackground
            width={width}
            height={height}
            buttonElement={buttonRef.current}
          />
        )}
        {/* {type === 'primary' && background.value && (
          <background.value.default
            height={height}
            width={width}
            buttonElement={buttonRef.current}
          />
        )} */}
      </button>
    </div>
  )
}
