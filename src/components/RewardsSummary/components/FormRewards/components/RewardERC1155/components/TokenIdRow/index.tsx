'use client'

import React from 'react'

import { TrashCan } from '@/assets/images'
import TextInput from '@/components/TextInput'

import { TokenIdRowInputProps } from '../../../../types'
import styles from './index.module.scss'

export function TokenIdRow({
  tokenNameTextInputProps,
  amountPerUserTextInputProps,
  onRemoveClick
}: TokenIdRowInputProps) {
  return (
    <div className={styles.root}>
      <TextInput {...tokenNameTextInputProps} />
      <TextInput {...amountPerUserTextInputProps} />
      <button onClick={onRemoveClick} className={styles.removeButton}>
        <TrashCan className={styles.removeIcon} />
      </button>
    </div>
  )
}
