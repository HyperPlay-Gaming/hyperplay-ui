import React from 'react'

import { IconExclamationCircle } from '@tabler/icons-react'

import styles from './index.module.scss'

export function QuestFormWarning({ message }: { message: string }) {
  return (
    <div className={styles.warningContainer}>
      <IconExclamationCircle size={20} />
      <span className={styles.warningMessage}>{message}</span>
    </div>
  )
}
