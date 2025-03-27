import { ReactNode } from 'react'

import { IconPlus, IconTrash } from '@tabler/icons-react'

import { Action } from '../SortableGameListingGrid/Action'
import styles from './GameListingCard.module.scss'

export type GameListingCardProps = {
  className?: string
  title: string
  image: ReactNode
  action: 'add' | 'remove' | 'none'
  onAction: () => void
  actionButtonProps?: React.HTMLAttributes<HTMLButtonElement>
}

export function GameListingCard({
  className,
  image,
  title,
  action,
  onAction,
  actionButtonProps
}: GameListingCardProps) {
  const actionIcons = {
    add: <IconPlus className={styles.icon} />,
    remove: <IconTrash className={`${styles.icon} ${styles.remove}`} />,
    none: null
  }
  const actionIcon = actionIcons[action]
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.imageWrapper}>{image}</div>
      <div className={styles.bottom}>
        <div className={styles.title}>{title}</div>
        {actionIcon ? (
          <Action
            className={styles.action}
            onClick={onAction}
            {...actionButtonProps}
          >
            {actionIcon}
          </Action>
        ) : (
          <div className={styles.action} />
        )}
      </div>
    </div>
  )
}
