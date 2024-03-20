'use client'

import React from 'react'

import Button from '@/components/Button'
import TextInput from '@/components/TextInput'

import { DEFAULT_FORM_REWARDS_i18n, FormRewardsI18n } from '../../../..'
import { TokenIdRowInputProps } from '../../../../types'
import styles from './index.module.scss'

export interface TokenIdRowProps extends TokenIdRowInputProps {
  i18n?: FormRewardsI18n
}

export function TokenIdRow({
  tokenNameInputProps,
  amountPerUserInputProps,
  onRemoveClick,
  i18n = DEFAULT_FORM_REWARDS_i18n
}: TokenIdRowProps) {
  return (
    <div className={styles.root}>
      <div className={styles.inputRow}>
        <TextInput
          label={i18n.label.tokenName}
          placeholder={i18n.placeholder.tokenName}
          {...tokenNameInputProps}
        />
        <TextInput
          label={i18n.label.amountPerUser}
          placeholder={i18n.placeholder.amountPerUser}
          {...amountPerUserInputProps}
        />
      </div>
      <Button
        type="tertiary"
        onClick={onRemoveClick}
        className={styles.removeButton}
        htmlType="button"
      >
        Remove
      </Button>
    </div>
  )
}
