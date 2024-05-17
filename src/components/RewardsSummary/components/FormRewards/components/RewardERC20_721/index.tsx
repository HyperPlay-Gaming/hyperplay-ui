'use client'

import React from 'react'

import NumberInput, { NumberInputProps } from '@/components/NumberInput'
import { RewardCommonInputsProps } from '@/components/RewardsSummary/components/FormRewards/components/RewardCommonInputs'
import TextInput, { TextInputProps } from '@/components/TextInput'
import { RewardCommonInputs } from '@/index'

import { DEFAULT_FORM_REWARDS_i18n, FormRewardsI18n } from '../..'
import { TokenRewardInput } from '../../types'
import styles from './index.module.scss'

export interface RewardERC20_721Props
  extends TokenRewardInput,
    RewardCommonInputsProps {
  decimalsInputProps?: NumberInputProps
  tokenType: 'ERC-20' | 'ERC-721'
  marketplaceUrlInputProps?: TextInputProps
  i18n?: FormRewardsI18n
}

export function RewardERC20_721({
  tokenNameInputProps,
  decimalsInputProps,
  amountPerUserInputProps,
  marketplaceUrlInputProps,
  tokenType,
  i18n = DEFAULT_FORM_REWARDS_i18n,
  ...commonInputsProps
}: RewardERC20_721Props) {
  let tokenInput = (
    <TextInput
      label={i18n.label.marketplaceUrl}
      placeholder={i18n.placeholder.marketplaceUrl}
      {...marketplaceUrlInputProps}
    />
  )

  if (tokenType === 'ERC-20') {
    tokenInput = (
      <NumberInput
        label={i18n.label.decimals}
        placeholder={i18n.placeholder.decimals}
        {...decimalsInputProps}
      />
    )
  }

  return (
    <RewardCommonInputs {...commonInputsProps}>
      <div className={styles.tokenContainer}>
        <TextInput
          label={i18n.label.tokenName}
          placeholder={i18n.placeholder.tokenName}
          {...tokenNameInputProps}
        />
        {tokenInput}
      </div>
      {tokenType === 'ERC-20' ? (
        <NumberInput
          label={i18n.label.amountPerUser}
          placeholder={i18n.placeholder.amountPerUser}
          {...amountPerUserInputProps}
        />
      ) : null}
    </RewardCommonInputs>
  )
}
