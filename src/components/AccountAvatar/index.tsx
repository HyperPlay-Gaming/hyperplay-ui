import { HTMLAttributes } from 'react'
import Blockies from 'react-blockies'

import cn from 'classnames'

import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  userId?: string
}

export default function AccountAvatar({ userId, className, ...others }: Props) {
  const offline = !userId

  if (offline) {
    return (
      <div className={cn(styles.container, className)} {...others}>
        <div className={cn(styles.avatar, styles.offlineAvatar)}>?</div>
        <span className={cn(styles.status, styles.offline)} />
      </div>
    )
  }

  return (
    <div className={cn(styles.container, className)} {...others}>
      <Blockies
        seed={userId}
        size={10}
        className={cn(styles.avatar, styles.onlineAvatar)}
        {...others}
      />
      <span className={cn(styles.status, styles.online)} />
    </div>
  )
}
