import { HTMLAttributes, ReactNode } from 'react'

import { Avatar } from '@mantine/core'
import cn from 'classnames'
import makeBlockie from 'ethereum-blockies-base64'

import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  userId?: string
  WalletIcon?: ReactNode
}

export default function AccountAvatar({
  userId,
  className,
  WalletIcon,
  ...others
}: Props) {
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
      <div className={styles.onlineAvatar}>
        <Avatar src={makeBlockie(userId)} size={10} className={styles.avatar} />
      </div>
      {WalletIcon && <div className={styles.walletIcon}>{WalletIcon}</div>}
      <span className={cn(styles.status, styles.online)} />
    </div>
  )
}
