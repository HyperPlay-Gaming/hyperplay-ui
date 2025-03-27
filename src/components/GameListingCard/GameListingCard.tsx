import { ReactNode } from 'react'

import { DraggableSyntheticListeners } from '@dnd-kit/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'

import styles from './GameListingCard.module.scss'

export type GameListingCardProps = {
  className?: string
  title: string
  image: ReactNode
  action: 'add' | 'remove' | 'none'
  onAction: () => void
  listeners: DraggableSyntheticListeners
}

export function GameListingCard({
  className,
  image,
  title,
  action,
  onAction,
  listeners
}: GameListingCardProps) {
  const actionIcons = {
    add: <IconPlus className={styles.icon} />,
    remove: <IconTrash className={`${styles.icon} ${styles.remove}`} />,
    none: null
  }
  const actionIcon = actionIcons[action]
  return (
    <div>
      <div className={`${styles.card} ${className}`} {...listeners}>
        <div className={styles.imageWrapper}>{image}</div>
        <div className={styles.bottom}>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
      {actionIcon ? (
        <button className={styles.action} onClick={onAction}>
          {actionIcon}
        </button>
      ) : (
        <div className={styles.action} />
      )}
    </div>
  )
}
