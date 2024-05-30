import React from 'react'

import {
  TxnAlert,
  TxnError,
  TxnPending,
  TxnSubmitted,
  TxnSuccess
} from '@/assets/images'

import { ToastGeneric, ToastGenericPropsAbstract } from '../ToastGeneric'

export type statusType = 'pending' | 'submitted' | 'error' | 'alert' | 'success'

export interface TransactionToastProps extends ToastGenericPropsAbstract {
  status: statusType
}

export default function TransactionToast(props: TransactionToastProps) {
  function getTxnImage(status: statusType): JSX.Element {
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
    <ToastGeneric
      image={getTxnImage(props.status)}
      title={props.title}
      subtext={props.subtext}
      showCloseButton={props.showCloseButton}
      onClick={props.onClick}
    />
  )
}
