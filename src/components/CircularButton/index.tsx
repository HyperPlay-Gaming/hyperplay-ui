import { HTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react'

import classNames from 'classnames'

import styles from './CircularButton.module.scss'

export interface CircularButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  disabled?: boolean
}

const CircularButton = ({
  children,
  className,
  disabled = false,
  ...props
}: CircularButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={classNames([className, styles.circularButton])}
      {...props}
    >
      {children}
    </button>
  )
}

export default CircularButton
