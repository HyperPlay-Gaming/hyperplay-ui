import React from 'react'

import {
  CloseButton,
  TxnAlert,
  TxnError,
  TxnPending,
  TxnSubmitted,
  TxnSuccess
} from '@/assets/images'

import styles from './index.module.css'

export type TransactionStatus = 'pending' | 'submitted' | 'error' | 'alert' | 'success'

export interface TransactionToastProps {
  title: string
  subtext: string
  status: TransactionStatus
  onClick: () => void
  showCloseButton?: boolean
}

export default function TransactionToast(props: TransactionToastProps) {
  function getTxnImage(status: TransactionStatus): JSX.Element {
    switch (status) {
      case 'pending':
        return <TxnPending />
      case 'submitted':
        return <TxnSubmitted />
      case 'error':
        return <TxnError />
      case 'alert':
        return <TxnAlert />
      case 'success':
        return <TxnSuccess />
    }
  }

  return (
    <div className={styles.txnPending}>
      <div style={{ width: '80px' }}>{getTxnImage(props.status)}</div>
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
