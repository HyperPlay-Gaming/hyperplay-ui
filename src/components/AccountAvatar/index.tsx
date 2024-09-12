import { HTMLAttributes, ReactNode } from 'react'

import { Avatar } from '@mantine/core'
import cn from 'classnames'
import makeBlockie from 'ethereum-blockies-base64'

import { QuestionMark } from '@/assets/images'

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

  const walletIcon = WalletIcon ? (
    <div className={styles.walletIcon}>{WalletIcon}</div>
  ) : null

  if (offline) {
    return (
      <div className={cn(styles.container, className)} {...others}>
        <div className={cn(styles.avatar, styles.offlineAvatarContainer)}>
          <QuestionMark fill="var(--color-neutral-700)" />
        </div>
        {walletIcon}
        <span className={cn(styles.status, styles.offline)} />
      </div>
    )
  }

  return (
    <div className={cn(styles.container, className)} {...others}>
      <div className={styles.onlineAvatarContainer}>
        <Avatar
          src={makeBlockie(userId)}
          size={10}
          className={cn(styles.avatar, styles.avatarConnected)}
        />
      </div>
      {walletIcon}
      <span className={cn(styles.status, styles.online)} />
    </div>
  )
}
