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

const TransactionToast = function (props: TransactionToastProps) {
  function getTxnImage(status: statusType) {
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
        <div className={`ui-title ${styles.txnTitle}`}>{props.title}</div>
        <div className="ui-body color-neutral-50">{props.subtext}</div>
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

export default TransactionToast
