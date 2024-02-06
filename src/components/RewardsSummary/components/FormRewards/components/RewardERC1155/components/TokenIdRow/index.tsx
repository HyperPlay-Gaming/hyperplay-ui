'use client'

import React from 'react'

import Button from '@/components/Button'
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
      <div className={styles.inputRow}>
        <TextInput {...tokenNameTextInputProps} />
        <TextInput {...amountPerUserTextInputProps} />
      </div>
      <Button
        type="tertiary"
        onClick={onRemoveClick}
        className={styles.removeButton}
      >
        Remove
      </Button>
    </div>
  )
}
