import classNames from 'classnames'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import styles from './CircularButton.module.scss'

export interface CircularButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  onClick?: () => void
}

const CircularButton = ({
  children,
  className,
  ...props
}: CircularButtonProps) => {
  return (
    <button
      className={classNames([styles.circularButton, className])}
      {...props}
    >
      {children}
    </button>
  )
}

export default CircularButton
