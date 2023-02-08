import React from 'react'
import styles from './index.module.css'
import { TxnPending, CloseButton } from '../../assets/images'

export const TransactionPending = () => (
  <div className={styles.txnPending}>
    <TxnPending/>
    <div className={styles.infoContainer}>
      <div className='title'>Transaction request pending</div>
      <div className='body color-neutral-50'>A wallet confirmation is pending on your mobile wallet.</div>
    </div>
    <CloseButton/>
  </div>
)