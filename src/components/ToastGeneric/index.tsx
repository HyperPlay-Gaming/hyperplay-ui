import React, { ReactElement } from 'react'

import { CloseButton } from '@/assets/images'

import styles from './ToastGeneric.module.scss'

export interface ToastGenericPropsAbstract {
  title: string
  subtext: string
  onClick: () => void
  showCloseButton?: boolean
}

export interface ToastGenericProps extends ToastGenericPropsAbstract {
  image: ReactElement | null
}

export function ToastGeneric(props: ToastGenericProps) {
  return (
    <div className={styles.txnPending}>
      <div style={{ width: '80px' }}>{props.image}</div>
      <div className={styles.infoContainer}>
        <div className={`title ${styles.txnTitle}`}>{props.title}</div>
        <div className="body color-neutral-100">{props.subtext}</div>
      </div>
      {props.showCloseButton ? (
        <div
          style={{ width: '24px', cursor: 'pointer' }}
          onClick={props.onClick}
        >
          <CloseButton />
        </div>
      ) : null}
    </div>
  )
}
