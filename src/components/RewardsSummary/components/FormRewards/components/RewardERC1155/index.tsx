'use client'

import React from 'react'

import Button from '@/components/Fab/components/Button'
import TextInput, { TextInputProps } from '@/components/TextInput'

import { TokenIdRowInputProps } from '../../types'
import { TokenIdRow } from './components/TokenIdRow'

export interface RewardERC1155Props {
  marketplaceUrlTextInputProps: TextInputProps
  rewardInputs: TokenIdRowInputProps[]
  addTokenId: () => void
  i18n: {
    addTokenId: string
  }
}

export function RewardERC1155({
  marketplaceUrlTextInputProps,
  rewardInputs,
  addTokenId,
  i18n
}: RewardERC1155Props) {
  const tokenIdRows = rewardInputs.map((inputs_i, index) => (
    <TokenIdRow
      key={index}
      {...inputs_i}
      onRemoveClick={inputs_i.onRemoveClick}
    />
  ))
  return (
    <>
      <div>
        {tokenIdRows}
        <Button onClick={addTokenId}>{i18n.addTokenId}</Button>
        <TextInput {...marketplaceUrlTextInputProps} />
      </div>
    </>
  )
}
