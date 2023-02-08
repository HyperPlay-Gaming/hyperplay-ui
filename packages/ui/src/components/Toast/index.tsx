import React from 'react'
import styles from './index.module.css'
import { TxnPending } from '../../assets/images'

export const TransactionPending = () => (
  <div className={styles.txnPending}>
    <TxnPending/>
    <h4>Transaction request pending</h4>
    <p>A wallet confirmation is pending on your mobile wallet.</p>
  </div>
)