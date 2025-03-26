import { ReactNode } from 'react'

import { IconPlus, IconTrash } from '@tabler/icons-react'

import styles from './GameListingCard.module.scss'

export interface GameListingCardProps {
  title: string
  image: ReactNode
  action: 'add' | 'remove' | 'none'
  onAction: () => void
}

export function GameListingCard({
  image,
  title,
  action,
  onAction
}: GameListingCardProps) {
  const actionIcons = {
    add: <IconPlus className={styles.icon} />,
    remove: <IconTrash className={`${styles.icon} ${styles.remove}`} />,
    none: null
  }
  const actionIcon = actionIcons[action]
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>{image}</div>
      <div className={styles.bottom}>
        <div className={styles.title}>{title}</div>
        {actionIcon ? (
          <button className={styles.action} onClick={onAction} type="button">
            {actionIcon}
          </button>
        ) : (
          <div className={styles.action} />
        )}
      </div>
    </div>
  )
}
