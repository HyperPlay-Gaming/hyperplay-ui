'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

import { TokenRewardInput } from '../../types'
import styles from './index.module.scss'

export interface RewardERC20_721Props extends TokenRewardInput {
  decimalsTextInputProps: TextInputProps
  tokenType: 'erc20' | 'erc721'
  marketplaceUrlTextInputProps: TextInputProps
}

export function RewardERC20_721({
  tokenNameTextInputProps,
  decimalsTextInputProps,
  amountPerUserTextInputProps,
  marketplaceUrlTextInputProps,
  tokenType
}: RewardERC20_721Props) {
  let tokenInput = <TextInput {...marketplaceUrlTextInputProps} />

  if (tokenType === 'erc20') {
    tokenInput = <TextInput {...decimalsTextInputProps} />
  }

  return (
    <>
      <div className={styles.tokenContainer}>
        <TextInput {...tokenNameTextInputProps} />
        {tokenInput}
      </div>
      <TextInput {...amountPerUserTextInputProps} />
    </>
  )
}
