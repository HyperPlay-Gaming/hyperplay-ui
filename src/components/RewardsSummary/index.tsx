import React, { useState } from 'react'

import { IconEdit } from '@tabler/icons-react'

import { TrashCan } from '@/assets/images'

import Button from '../Button'
import { ContainerInteractive } from '../ContainerInteractive'
import { RewardDetails } from '../RewardDetails'
import styles from './RewardsSummary.module.scss'
import {
  FormRewards,
  FormRewardsI18n,
  FormRewardsProps
} from './components/FormRewards'

export interface RewardsSummaryI18n extends FormRewardsI18n {
  confirm?: string
  remove?: string
}

export interface RewardsSummaryProps extends Omit<FormRewardsProps, 'i18n'> {
  title: string
  classNames?: {
    root?: string
  }
  editable: boolean
  onEditableChange: (editable: boolean) => void

  i18n?: RewardsSummaryI18n
}

export function RewardsSummary({
  title,
  editable: editableInit,
  onEditableChange,
  i18n = {
    remove: 'Remove',
    confirm: 'Confirm Changes',
    addTokenId: 'Add Token ID',
    placeholder: {
      rewardType: 'Please Select a Reward Type',
      network: 'Please Select a Network',
      contractAddress: 'Please Enter a Contract Address',
      tokenName: 'Please Enter a Token Name',
      marketplaceUrl: 'Please Enter a Marketplace URL',
      decimals: '0',
      amountPerUser: '0'
    },
    label: {
      rewardType: 'Reward Type',
      network: 'Chain',
      contractAddress: 'Contract Address',
      tokenName: 'Token Name',
      marketplaceUrl: 'Marketplace URL',
      decimals: 'Decimals',
      amountPerUser: 'Amount Per User'
    }
  },
  ...props
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
        {i18n.remove}
      </Button>
    )
  }

  let content = (
    <RewardDetails
      chainName={props.networkInputProps.value}
      tokenType={props.rewardTypeInputProps.value}
      tokenSymbol={props.tokenNameInputProps.value}
      rewardPerPlayer={props.amountPerUserInputProps.value}
      marketplace={props.marketplaceUrlInputProps.value}
      tokenContractAddress={props.contractAddressInputProps.value}
    />
  )
  if (editable) {
    content = <FormRewards i18n={i18n} {...props} />
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
