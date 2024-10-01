import React, { HTMLProps, PropsWithChildren } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface ModalAnimationProps
  extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  isOpen: boolean
  onClose: () => void
}

export default function ModalAnimation({
  children,
  isOpen,
  onClose,
  className,
  ...props
}: ModalAnimationProps) {
  return (
    <div
      {...props}
      className={classNames(
        styles.container,
        {
          [styles.open]: isOpen
        },
        className
      )}
    >
      <div
        className={classNames(styles.overlay, {
          [styles.disabled]: !isOpen
        })}
        onClick={onClose}
      />
      <div
        className={classNames(styles.modal, {
          [styles.modalOpen]: isOpen
        })}
      >
        {children}
      </div>
    </div>
  )
}
