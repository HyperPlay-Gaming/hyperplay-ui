'use client'

import React from 'react'

import { TrashCan } from '@/assets/images'
import TextInput from '@/components/TextInput'

import { i18nDefaultValues } from '../../../../constants'
import { TokenIdRowInputProps, i18nProps } from '../../../../types'

export interface TokenIdRowProps extends TokenIdRowInputProps, i18nProps {}

export function TokenIdRow({
  tokenNameTextInputProps,
  amountPerUserTextInputProps,
  onRemoveClick,
  i18n = i18nDefaultValues
}: TokenIdRowProps) {
  return (
    <div>
      <TextInput
        placeholder={i18n.tokenNamePlaceholder}
        label={i18n.tokenNameLabel}
        {...tokenNameTextInputProps}
      />
      <TextInput
        placeholder="0"
        label={i18n.amountPerPlayerLabel}
        {...amountPerUserTextInputProps}
      />
      <button onClick={onRemoveClick}>
        <TrashCan />
      </button>
    </div>
  )
}
