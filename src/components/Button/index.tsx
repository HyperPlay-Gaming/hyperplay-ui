import React, { PropsWithChildren, useRef } from 'react'
import { useMeasure } from 'react-use'

import classNames from 'classnames'

import useIsBrowser from '@/utils/useIsBrowser'

import styles from './Button.module.scss'
import PrimaryBackground from './components/PrimaryBackground'

export interface ButtonProps extends PropsWithChildren {
  type?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'danger' | 'menuItem'
  size?: 'small' | 'medium'
  leftIcon?: JSX.Element
  rightIcon?: React.ReactNode
  onClick?: () => void
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
          styles[type],
          styles[size],
          size === 'small' ? 'button-sm' : 'button',
          {
            [styles.link]: type === 'menuItem',
            'menu-item': type === 'menuItem',
            [styles.active]: active
          }
        )}
        style={{ width: widthStyle }}
      >
        <div className={styles.content}>
          {leftIcon}
          <div className={styles.text}>{children}</div>
          {rightIcon}
        </div>
        {isBrowser && type === 'primary' && (
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
