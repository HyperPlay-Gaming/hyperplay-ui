'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

export interface RewardERC20I18nProp {
  placeholder: {
    totalPlayerReach: string
  }
  label: {
    totalPlayerReach: string
  }
}

export interface RewardERC20Props {
  totalPlayerReachNumberInputProps: TextInputProps
  i18n?: RewardERC20I18nProp
}

export const defaultI18n: RewardERC20I18nProp = {
  placeholder: {
    totalPlayerReach: '0'
  },
  label: {
    totalPlayerReach: 'Enter Total Player Reach'
  }
}

export function RewardERC20({
  totalPlayerReachNumberInputProps,
  i18n = defaultI18n
}: RewardERC20Props) {
  return (
    <>
      <TextInput
        {...totalPlayerReachNumberInputProps}
        size="medium"
        label={i18n.label.totalPlayerReach}
        placeholder={i18n.placeholder.totalPlayerReach}
      />
    </>
  )
}
