'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'
import Button from '@/components/Fab/components/Button'
import { TokenIdRowInputProps, i18nProps } from '../../types'
import { TokenIdRow } from './components/TokenIdRow'
import { i18nDefaultValues } from '../../constants'

export interface RewardERC1155Props extends i18nProps{
  marketplaceUrlTextInputProps: TextInputProps
  rewardInputs: TokenIdRowInputProps[]
  addTokenId: ()=>void
}

export function RewardERC1155({
  marketplaceUrlTextInputProps,
  rewardInputs,
  addTokenId,
  i18n = i18nDefaultValues
}: RewardERC1155Props) {
    const tokenIdRows = rewardInputs.map((inputs_i, index)=><TokenIdRow key={index} {...inputs_i} onRemoveClick={}/>)
  return (
    <>
      <div>
        {tokenIdRows}
        <Button onClick={addTokenId}>{i18n.addTokenId}</Button>
        <TextInput
          placeholder="Enter Marketplace URL"
          label="Marketplace URL"
          {...marketplaceUrlTextInputProps}
        />
      </div>
    </>
  )
}
