'use client'

import React from 'react'

import NumberInput, { NumberInputProps } from '@/components/NumberInput'

import styles from './index.module.scss'

export interface RewardERC1155DepositI18nProp {
  placeholder: {
    totalPlayerReachTokenOne: string
    totalPlayerReachTokenTwo: string
  }
  label: {
    totalPlayerReachTokenOne: string
    totalPlayerReachTokenTwo: string
  }
}

export interface RewardERC1155DepositProps {
  totalPlayerReachTokenOneInputProps?: NumberInputProps
  totalPlayerReachTokenTwoInputProps?: NumberInputProps
  i18n?: RewardERC1155DepositI18nProp
}

export const defaultI18n: RewardERC1155DepositI18nProp = {
  placeholder: {
    totalPlayerReachTokenOne: '0',
    totalPlayerReachTokenTwo: '0'
  },
  label: {
    totalPlayerReachTokenOne: 'Total Player Reach',
    totalPlayerReachTokenTwo: 'Total Player Reach'
  }
}

export function RewardERC1155Deposit({
  totalPlayerReachTokenOneInputProps,
  totalPlayerReachTokenTwoInputProps,
  i18n = defaultI18n
}: RewardERC1155DepositProps) {
  return (
    <div className={styles.base}>
      <NumberInput
        {...totalPlayerReachTokenOneInputProps}
        size="medium"
        label={i18n.label.totalPlayerReachTokenOne}
        placeholder={i18n.placeholder.totalPlayerReachTokenOne}
      />
      <NumberInput
        {...totalPlayerReachTokenTwoInputProps}
        size="medium"
        label={i18n.label.totalPlayerReachTokenTwo}
        placeholder={i18n.placeholder.totalPlayerReachTokenTwo}
      />
    </div>
  )
}

export default RewardERC1155Deposit
