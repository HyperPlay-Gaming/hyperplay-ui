import classNames from 'classnames'
import React, { HTMLProps, PropsWithChildren } from 'react'
import styles from './index.module.scss'

interface ModalAnimationProps
  extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  isOpen: boolean
  onClose: () => void
}

export default function ModalAnimation({
  children,
  isOpen,
  onClose,
  ...props
}: ModalAnimationProps) {
  return (
    <div
      {...props}
      className={classNames(styles.container, {
        [styles.open]: isOpen
      })}
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
