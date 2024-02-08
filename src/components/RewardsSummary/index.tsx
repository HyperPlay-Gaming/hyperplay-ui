import React, { useState } from 'react'

import { GetInputPropsReturnType } from '@mantine/form/lib/types'
import { IconEdit } from '@tabler/icons-react'

import { TrashCan } from '@/assets/images'

import Button from '../Button'
import { ContainerInteractive } from '../ContainerInteractive'
import { RewardDetails } from '../RewardDetails'
import styles from './RewardsSummary.module.scss'
import { FormRewards } from './components/FormRewards'

export interface RewardsSummaryProps {
  title: string
  classNames?: {
    root?: string
  }
  editable: boolean
  onEditableChange: (editable: boolean) => void

  // form props
  rewardTypeInputProps: GetInputPropsReturnType
  networkInputProps: GetInputPropsReturnType
  tokenAddressInputProps: GetInputPropsReturnType
  tokenNameInputProps: GetInputPropsReturnType
  amountPerUserInputProps: GetInputPropsReturnType
  marketplaceUrlInputProps: GetInputPropsReturnType
  decimalsInputProps: GetInputPropsReturnType

  i18n?: {
    confirm?: string
  }
}

export function RewardsSummary({
  title,
  editable: editableInit,
  onEditableChange,
  rewardTypeInputProps,
  networkInputProps,
  tokenAddressInputProps,
  tokenNameInputProps,
  amountPerUserInputProps,
  marketplaceUrlInputProps,
  decimalsInputProps,
  i18n = { confirm: 'Confirm Changes' }
}: RewardsSummaryProps) {
  const [editable, setEditable] = useState(editableInit)

  const updateEditable = (edit: boolean) => {
    onEditableChange(edit)
    setEditable(edit)
  }

  let iconButton = (
    <button onClick={() => updateEditable(true)}>
      <IconEdit color="var(--color-neutral-400)" />
    </button>
  )
  if (editable) {
    iconButton = (
      <Button
        type="tertiary"
        rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
      >
        Remove
      </Button>
    )
  }

  let content = (
    <RewardDetails
      chainName={networkInputProps.value}
      tokenType={rewardTypeInputProps.value}
      tokenSymbol={tokenNameInputProps.value}
      rewardPerPlayer={amountPerUserInputProps.value}
      marketplace={marketplaceUrlInputProps.value}
      tokenContractAddress={tokenAddressInputProps.value}
    />
  )
  if (editable) {
    content = (
      <FormRewards
        tokenAddressTextInputProps={tokenAddressInputProps}
        marketplaceUrlTextInputProps={marketplaceUrlInputProps}
      />
    )
  }

  let confirmButton = null
  if (editable) {
    confirmButton = (
      <Button type="secondary" onClick={() => updateEditable(false)}>
        {i18n.confirm}
      </Button>
    )
  }

  return (
    <ContainerInteractive
      title={title}
      icon={iconButton}
      classNames={{ root: styles.root }}
    >
      {content}
      {confirmButton}
    </ContainerInteractive>
  )
}
