import React, { PropsWithChildren, useRef } from 'react'
import styles from './Button.module.scss'
import { useMeasure, useAsync } from 'react-use'
import classNames from 'classnames'

export interface ButtonProps extends PropsWithChildren {
  type?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'danger'
  size?: 'small' | 'medium'
  leftIcon?: JSX.Element
  rightIcon?: React.ReactNode
}

export default function Button({
  type = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  children
}: ButtonProps) {
  const background = useAsync(
    async () => type === 'primary' && import('./components/PrimaryBackground')
  )

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div ref={ref} style={{ width: 'fit-content', height: 'fit-content' }}>
      <button
        ref={buttonRef}
        className={classNames(
          styles.base,
          styles[type],
          styles[size],
          size === 'small' ? 'button-sm' : 'button'
        )}
      >
        <div className={styles.content}>
          {leftIcon}
          <div className={styles.text}>{children}</div>
          {rightIcon}
        </div>

        {type === 'primary' && background.value && (
          <background.value.default
            height={height}
            width={width}
            buttonElement={buttonRef.current}
          />
        )}
      </button>
    </div>
  )
}
