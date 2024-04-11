'use client'

import React from 'react'

import { NumberInput, NumberInputProps } from '@/index'

export interface RewardERC20DepositI18nProp {
  placeholder: {
    totalPlayerReach: string
  }
  label: {
    totalPlayerReach: string
  }
}

export interface RewardERC20DepositProps {
  totalPlayerReachNumberInputProps?: NumberInputProps
  i18n?: RewardERC20DepositI18nProp
}

export const defaultI18n: RewardERC20DepositI18nProp = {
  placeholder: {
    totalPlayerReach: '0'
  },
  label: {
    totalPlayerReach: 'Enter Total Player Reach'
  }
}

export function RewardERC20Deposit({
  totalPlayerReachNumberInputProps,
  i18n = defaultI18n
}: RewardERC20DepositProps) {
  return (
    <>
      <NumberInput
        {...totalPlayerReachNumberInputProps}
        size="medium"
        label={i18n.label.totalPlayerReach}
        placeholder={i18n.placeholder.totalPlayerReach}
      />
    </>
  )
}

export default RewardERC20Deposit
