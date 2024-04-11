import cn from 'classnames'

import styles from './DepositMessage.module.scss'

interface Props {
  message: string
  classNames?: {
    root?: string
    message?: string
  }
}

export default function DepositMessage({ classNames, message }: Props) {
  return (
    <div className={cn(styles.messageContainer, classNames?.root)}>
      <span className={cn(styles.message, classNames?.message)}>{message}</span>
    </div>
  )
}
