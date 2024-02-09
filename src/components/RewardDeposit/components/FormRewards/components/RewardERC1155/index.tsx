'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './index.module.scss'

export interface RewardERC1155Props {
  tokenIdsNumberInputs: TextInputProps[]
  totalPlayerReachNumberInputs: TextInputProps[]
  i18n?: {
    tokenIdsTitle: string
  },
}

export function RewardERC1155({
  tokenIdsNumberInputs,
  totalPlayerReachNumberInputs,
  i18n = {
    tokenIdsTitle: 'Token IDs'
  },
}: RewardERC1155Props) {
  const tokenIdsNumberInput = tokenIdsNumberInputs.map((tokenIdInputProps, index) => (
    <TextInput
      key={index}
      {...tokenIdInputProps}
    />
  ))
  const totalPlayerReachNumberInput = totalPlayerReachNumberInputs.map((tokenIdInputProps, index) => (
    <TextInput
      key={index}
      className={styles.totalPlayerReachNumberInput}
      {...tokenIdInputProps}
    />
  ))

  return (
    <div>
      <div className={styles.tokenIdContainer}>
        <h6 className={styles.title}>{i18n.tokenIdsTitle}</h6>
        {tokenIdsNumberInput}
      </div>
      {totalPlayerReachNumberInput}
    </div>
  )
}
