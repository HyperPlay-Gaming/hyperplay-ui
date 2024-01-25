import { IconCircleX, IconInfoCircle } from '@tabler/icons-react'

import styles from './InfoButton.module.scss'

export interface InfoButtonProps {
  opened: boolean
  onClick?: () => void
  i18n?: {
    info?: string
    close?: string
  }
}

export default function InfoButton({
  opened,
  onClick,
  i18n = { info: 'Info', close: 'Close' }
}: InfoButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {!opened && (
        <>
          <IconInfoCircle size={24} />
          <div className="caption">{i18n.info}</div>
        </>
      )}
      {opened && (
        <>
          <IconCircleX size={24} />
          <div className="caption">{i18n.close}</div>
        </>
      )}
    </button>
  )
}
