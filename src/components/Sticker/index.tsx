import React, { HTMLProps } from 'react'

import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classNames from 'classnames'

import styles from './index.module.scss'

type StyleType =
  | 'neutral'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'

type withIcon = React.ReactNode
type withDot = {
  dotColor: 'success' | 'error' | 'warning' | 'neutral' | 'tertiary'
  dotIcon?: React.ElementType
}
type Dimension = 'default' | 'small'
type Variant = 'outlined' | 'filled' | 'filledStrong'

export interface StickerProps extends HTMLProps<HTMLDivElement> {
  styleType?: StyleType
  withIcon?: withIcon
  withDot?: withDot
  dotColor?: withDot['dotColor']
  dimension?: Dimension
  variant?: Variant
  showTooltip?: boolean
}

// This was the only way to override the mantine styles
const popoverStyles = {
  dropdown: {
    backgroundColor: 'var(--background-overlay)',
    border: 'none',
    borderRadius: 'var(--space-sm)',
    padding: 'var(--space-xs) var(--space-sm)',
    color: 'var(--text-strong)',
    boxShadow: '0px 20px 24px -8px rgba(124, 58, 237, 0.114)'
  },
  arrow: {
    backgroundColor: 'var(--background-overlay)',
    border: 'none'
  }
}

export default function Sticker({
  styleType = 'secondary',
  variant = 'outlined',
  dimension = 'default',
  withIcon,
  withDot,
  className,
  children,
  showTooltip = false,
  ...props
}: StickerProps) {
  const [showPopover, { open, close }] = useDisclosure(false)
  const divClasses = {
    [styles.neutral]: styleType === 'neutral',
    [styles.secondary]: styleType === 'secondary',
    [styles.tertiary]: styleType === 'tertiary',
    [styles.success]: styleType === 'success',
    [styles.warning]: styleType === 'warning',
    [styles.error]: styleType === 'error',
    [styles.sizeDefault]: dimension === 'default',
    [styles.sizeSmall]: dimension === 'small',
    [styles.icon]: withIcon,
    [styles.dot]: withDot?.dotColor,
    [styles.outlined]: variant === 'outlined',
    [styles.filled]: variant === 'filled',
    [styles.filledStrong]: variant === 'filledStrong'
  }

  return (
    <div
      {...props}
      className={classNames('body-sm', styles.sticker, className, divClasses)}
    >
      {withIcon && <span className={styles.icon}>{withIcon}</span>}
      {withDot && (
        <span className={styles.dot} data-status={withDot.dotColor}>
          {withDot.dotIcon && typeof withDot.dotIcon === 'function'
            ? React.createElement(withDot.dotIcon)
            : null}
        </span>
      )}
      {showTooltip ? (
        <Popover
          position="top"
          withArrow
          opened={showPopover}
          offset={{ mainAxis: 16 }}
          styles={popoverStyles}
        >
          <Popover.Target>
            <span
              className={styles.text}
              onMouseEnter={open}
              onMouseLeave={close}
            >
              {children}
            </span>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="caption-sm">{children}</div>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <span className={styles.text}>{children}</span>
      )}
    </div>
  )
}
