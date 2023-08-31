import React, { InputHTMLAttributes, PropsWithChildren } from 'react'

import styles from './Toggle.module.scss'

export interface ToggleProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  disabled?: boolean
  labelPosition?: 'left' | 'right'
}

export default function Toggle({
  labelPosition = 'left',
  disabled,
  children,
  ...props
}: ToggleProps) {
  return (
    <label className={styles.switch}>
      {labelPosition === 'left' ? children : null}
      <div className={styles.switchContainer}>
        <input
          type="checkbox"
          {...props}
          disabled={disabled}
          className={`${styles.inputCheckbox}`}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </div>
      {labelPosition === 'right' ? children : null}
    </label>
  )
}
