'use client'

import React from 'react'

import TextInput, { TextInputProps } from '@/components/TextInput'

export interface RewardERC20Props {
  totalPlayerReachNumberInputProps: TextInputProps
}

export function RewardERC20({
  totalPlayerReachNumberInputProps,
}: RewardERC20Props) {
  return (
    <>
      <TextInput {...totalPlayerReachNumberInputProps} />
    </>
  )
}
