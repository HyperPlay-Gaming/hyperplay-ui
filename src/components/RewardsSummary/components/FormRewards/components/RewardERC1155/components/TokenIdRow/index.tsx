'use client'

import React from 'react'

import { TrashCan } from '@/assets/images'
import TextInput from '@/components/TextInput'

import { TokenIdRowInputProps } from '../../../../types'

export function TokenIdRow({
  tokenNameTextInputProps,
  amountPerUserTextInputProps,
  onRemoveClick
}: TokenIdRowInputProps) {
  return (
    <div>
      <TextInput {...tokenNameTextInputProps} />
      <TextInput {...amountPerUserTextInputProps} />
      <button onClick={onRemoveClick}>
        <TrashCan />
      </button>
    </div>
  )
}
