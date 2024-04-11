import cn from 'classnames'

import styles from './RewardDepositMessage.module.scss'

interface Props {
  message: string
  classNames?: {
    root?: string
    message?: string
  }
}

export default function RewardDepositMessage({ classNames, message }: Props) {
  return (
    <div className={cn(styles.messageContainer, classNames?.root)}>
      <span className={cn(styles.message, classNames?.message)}>{message}</span>
    </div>
  )
}
