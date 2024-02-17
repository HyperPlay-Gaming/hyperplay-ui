import { HTMLProps } from 'react'

import { AlertTriangle } from '@/assets/images'

import styles from './index.module.scss'

export function AlertText(props: HTMLProps<HTMLDivElement>) {
  return (
    <div className={styles.alertTextContainer} {...props}>
      <AlertTriangle className={styles.alertTriangle} />
      <div>{props.children}</div>
    </div>
  )
}
