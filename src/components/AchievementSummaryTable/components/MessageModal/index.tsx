import React from 'react'

import styles from './MessageModal.module.scss'
import classNames from 'classnames'

export interface MessageModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  message: string
}

export default function MessageModal({
  title,
  message,
  className,
  ...rest
}: MessageModalProps) {
  return (
    <div className={classNames(styles.messageModalContainer, className)} {...rest}>
      <div className="header">{title}</div>
      <div className={`${styles.message} body`}>{message}</div>
    </div>
  )
}
