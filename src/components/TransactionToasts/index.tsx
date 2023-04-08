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

export type statusType = 'pending' | 'submitted' | 'error' | 'alert' | 'success'

interface TransactionToastProps {
  title: string
  subtext: string
  status: statusType
  onClick: () => void
  showCloseButton?: boolean
}

export const TransactionToast = function (props: TransactionToastProps) {
  function getTxnImage(status: statusType) {
    switch (status) {
      case 'pending':
        return <TxnPending />
        break
      case 'submitted':
        return <TxnSubmitted />
        break
      case 'error':
        return <TxnError />
        break
      case 'alert':
        return <TxnAlert />
        break
      case 'success':
        return <TxnSuccess />
        break
    }
    return <></>
  }

  return (
    <div className={styles.txnPending}>
      <div style={{ width: '80px' }}>{getTxnImage(props.status)}</div>
      <div className={styles.infoContainer}>
        <div className={`title ${styles.txnTitle}`}>{props.title}</div>
        <div className="body color-neutral-50">{props.subtext}</div>
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
