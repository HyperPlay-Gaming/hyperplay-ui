'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

import { DEFAULT_FORM_REWARDS_i18n, FormRewardsI18n } from '../..'
import { TokenRewardInput } from '../../types'
import styles from './index.module.scss'

export interface RewardERC20_721Props extends TokenRewardInput {
  decimalsInputProps?: TextInputProps
  tokenType: 'ERC20' | 'ERC721'
  marketplaceUrlInputProps?: TextInputProps
  i18n?: FormRewardsI18n
}

export function RewardERC20_721({
  tokenNameInputProps,
  decimalsInputProps,
  amountPerUserInputProps,
  marketplaceUrlInputProps,
  tokenType,
  i18n = DEFAULT_FORM_REWARDS_i18n
}: RewardERC20_721Props) {
  let tokenInput = (
    <TextInput
      label={i18n.label.marketplaceUrl}
      placeholder={i18n.placeholder.marketplaceUrl}
      {...marketplaceUrlInputProps}
    />
  )

  if (tokenType === 'ERC20') {
    tokenInput = (
      <TextInput
        label={i18n.label.decimals}
        placeholder={i18n.placeholder.decimals}
        {...decimalsInputProps}
      />
    )
  }

  return (
    <>
      <div className={styles.tokenContainer}>
        <TextInput
          label={i18n.label.tokenName}
          placeholder={i18n.placeholder.tokenName}
          {...tokenNameInputProps}
        />
        {tokenInput}
      </div>
      <TextInput
        label={i18n.label.amountPerUser}
        placeholder={i18n.placeholder.amountPerUser}
        {...amountPerUserInputProps}
      />
    </>
  )
}
