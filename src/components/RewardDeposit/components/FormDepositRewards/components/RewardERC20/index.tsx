'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

export interface RewardERC20Props {
  totalPlayerReachNumberInputProps: TextInputProps
  i18n?: {
    placeholder: {
      totalPlayerReach: string
    }
    label: {
      totalPlayerReach: string
    }
  }
}

export function RewardERC20({
  totalPlayerReachNumberInputProps,
  i18n = {
    placeholder: {
      totalPlayerReach: '0'
    },
    label: {
      totalPlayerReach: 'Enter Total Player Reach'
    }
  }
}: RewardERC20Props) {
  return (
    <>
      <TextInput
        {...totalPlayerReachNumberInputProps}
        label={i18n.label.totalPlayerReach}
        placeholder={i18n.label.totalPlayerReach}
      />
    </>
  )
}
