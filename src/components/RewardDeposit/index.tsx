'use client'

import React from 'react'

import styles from './RewardDeposit.module.scss'

export interface RewardDepositProps {
  tokenType: 'erc20' | 'erc1155' | 'erc721'
  title: string
}

export function RewardDeposit({ tokenType, title }: RewardDepositProps) {
  return <div className={styles.depositContainer}>{title}</div>
}
