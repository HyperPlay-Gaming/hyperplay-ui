'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

import { i18nDefaultValues } from '../../constants'
import { TokenRewardInput, i18nProps } from '../../types'

export interface RewardERC20Props extends TokenRewardInput, i18nProps {
  decimalsTextInputProps: TextInputProps
  tokenType: 'erc20' | 'erc721'
  marketplaceUrlTextInputProps: TextInputProps
}

export function RewardERC20({
  tokenNameTextInputProps,
  decimalsTextInputProps,
  amountPerUserTextInputProps,
  marketplaceUrlTextInputProps,
  tokenType,
  i18n = i18nDefaultValues
}: RewardERC20Props) {
  let tokenInput = (
    <TextInput
      placeholder={i18n.marketplacePlaceholder}
      label={i18n.marketplaceLabel}
      {...marketplaceUrlTextInputProps}
    />
  )

  if (tokenType === 'erc20') {
    tokenInput = (
      <TextInput
        placeholder="0"
        label={i18n.decimalsLabel}
        {...decimalsTextInputProps}
      />
    )
  }

  return (
    <>
      <div>
        <TextInput
          placeholder={i18n.tokenNamePlaceholder}
          label={i18n.tokenNameLabel}
          {...tokenNameTextInputProps}
        />
        {tokenInput}
      </div>
      <TextInput
        placeholder="0"
        label={i18n.amountPerPlayerLabel}
        {...amountPerUserTextInputProps}
      />
    </>
  )
}
