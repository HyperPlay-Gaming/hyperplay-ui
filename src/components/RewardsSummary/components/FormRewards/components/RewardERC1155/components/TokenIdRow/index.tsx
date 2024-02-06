'use client'

import React from 'react'

import cn from 'classnames'

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
      <div className={styles.removeButtonContainer}>
        <label className={cn('caption', styles.alignmentLabel)}>
          only for alignment
        </label>
        <button onClick={onRemoveClick} className={styles.removeButton}>
          <TrashCan className={styles.removeIcon} />
        </button>
      </div>
    </div>
  )
}
