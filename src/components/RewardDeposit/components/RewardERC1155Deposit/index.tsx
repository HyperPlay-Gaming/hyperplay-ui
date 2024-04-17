'use client'

import React from 'react'

import NumberInput, { NumberInputProps } from '@/components/NumberInput'

import styles from './index.module.scss'

export interface RewardERC1155DepositProps {
  tokenInputsProps?: NumberInputProps[]
}

export function RewardERC1155Deposit({
  tokenInputsProps
}: RewardERC1155DepositProps) {
  return (
    <div className={styles.base}>
      {tokenInputsProps?.map((props, index) => (
        <NumberInput key={`input-${index}`} {...props} size="medium" />
      ))}
    </div>
  )
}

export default RewardERC1155Deposit
