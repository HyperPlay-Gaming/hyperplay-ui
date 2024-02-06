'use client'

import React from 'react'

import { IconPlus } from '@tabler/icons-react'

import Button from '@/components/Button'
import TextInput, { TextInputProps } from '@/components/TextInput'

import { TokenIdRowInputProps } from '../../types'
import { TokenIdRow } from './components/TokenIdRow'

export interface RewardERC1155Props {
  marketplaceUrlTextInputProps: TextInputProps
  erc1155RewardInputs: TokenIdRowInputProps[]
  addTokenId: () => void
  i18n: {
    addTokenId: string
  }
}

export function RewardERC1155({
  marketplaceUrlTextInputProps,
  erc1155RewardInputs,
  addTokenId,
  i18n
}: RewardERC1155Props) {
  const tokenIdRows = erc1155RewardInputs.map((inputs_i, index) => (
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
        <Button onClick={addTokenId} type="link" leftIcon={<IconPlus />}>
          {i18n.addTokenId}
        </Button>
        <TextInput {...marketplaceUrlTextInputProps} />
      </div>
    </>
  )
}
