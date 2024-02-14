import React, { ReactElement, useState } from 'react'

import { IconEdit } from '@tabler/icons-react'

import { TrashCan } from '@/assets/images'
import {
  RewardDepositedTableI18nProp,
  RewardsDepositedTable,
  RewardsDepositedTableProps,
  defaultI18n as defaultRewardDepositedTableI18n
} from '@/components/RewardsDepositedTable'
import Sticker from '@/components/Sticker'

import Button from '../Button'
import { ContainerInteractive } from '../ContainerInteractive'
import {
  RewardDetails,
  RewardDetailsI18nProp,
  RewardDetailsProps,
  defaultI18n as defaultRewardDetailsI18n
} from '../RewardDetails'
import styles from './RewardDeposit.module.scss'
import { FormDepositActions, FormDepositActionsI18nProp, defaultI18n as defaultFormDepositActionsI18n } from './components/FormDepositActions'
import {
  FormDepositRewardI18nProp,
  FormDepositRewards,
  FormDepositRewardsProps,
  defaultI18n as defaultFormDepositRewardsI18n
} from './components/FormDepositRewards'

export const defaultI18n = {
  remove: 'Remove',
  pendingDeposit: 'Pending Deposit',
  depositedLabel: 'Deposited',
  ...defaultFormDepositRewardsI18n,
  ...defaultFormDepositActionsI18n,
  ...defaultRewardDepositedTableI18n,
  ...defaultRewardDetailsI18n
}

interface RewardDepositI18nProp
  extends FormDepositRewardI18nProp,
    RewardDetailsI18nProp,
    RewardDepositedTableI18nProp, 
    FormDepositActionsI18nProp {
  remove: string
  pendingDeposit?: string
  tokenIdsTitle: string
  depositedLabel: string
  submitBtn: string
  totalDeposit: string
}

export interface RewardDepositProps
  extends Omit<FormDepositRewardsProps, 'i18n'>,
    Omit<RewardDetailsProps, 'i18n'>,
    Omit<RewardsDepositedTableProps, 'i18n'> {
  title: string
  classNames?: {
    root?: string
  }
  isAddTokenButtonDisabled: boolean
  state: 'NOT_DEPOSITED' | 'DEPOSITED',
  depositingAmount?: string
  onEditClick: (editable: boolean) => void
  onFormSubmit: () => void
  onRemoveClick: () => void
  i18n?: RewardDepositI18nProp
}

export function RewardDeposit({
  title,
  state,
  depositingAmount,
  onFormSubmit,
  tokenIdsList,
  isAddTokenButtonDisabled,
  defaultSelected,
  onAddTokenTap = () => null,
  i18n = defaultI18n,
  onEditClick,
  onRemoveClick,
  ...props
}: RewardDepositProps) {
  const tag: ReactElement = state === 'DEPOSITED' ? (
    <Sticker
      styleType="success"
      variant="filled"
      className={styles.successDepositLabel}
    >
      {i18n.depositedLabel}
    </Sticker>
  ) : (
    <Sticker
      styleType="warning"
      variant="filled"
      className={styles.pendingDepositLabel}
    >
      {i18n.pendingDeposit}
    </Sticker>
  )

  let iconButton = (
    <button onClick={() => onEditClick(true)}>
      <IconEdit color="var(--color-neutral-400)" />
    </button>
  )
  if (state === 'NOT_DEPOSITED') {
    iconButton = (
      <Button
        type="tertiary"
        rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
        onClick={onRemoveClick}
      >
        {i18n.remove}
      </Button>
    )
  }

  let content = (
    <RewardDetails
      chainName={props.chainName}
      tokenType={props.tokenType}
      tokenSymbol={props.tokenSymbol}
      rewardPerPlayer={props.rewardPerPlayer}
      marketplace={props.marketplace}
      tokenContractAddress={props.tokenContractAddress}
      i18n={i18n}
    />
  )
  if (state === 'NOT_DEPOSITED') {
    content = (
      <>
        <FormDepositRewards
          tokenFromNumberInputProps={props.tokenFromNumberInputProps}
          amountPerUserTextInputProps={props.amountPerUserTextInputProps}
          totalPlayerReachNumberInputProps={
            props.totalPlayerReachNumberInputProps
          }
          tokenIdGoldNumberInputProps={props.tokenIdGoldNumberInputProps}
          tokenIdSilverNumberInputProps={props.tokenIdSilverNumberInputProps}
          totalPlayerReachGoldNumberInputProps={
            props.totalPlayerReachGoldNumberInputProps
          }
          totalPlayerReachSilverNumberInputProps={
            props.totalPlayerReachSilverNumberInputProps
          }
          tokenToNumberInputProps={props.tokenToNumberInputProps}
          tokenIdsList={tokenIdsList}
          isAddTokenButtonDisabled={isAddTokenButtonDisabled}
          onAddTokenTap={onAddTokenTap}
          defaultSelected={defaultSelected}
          i18n={i18n}
        />
        <RewardsDepositedTable
          playerReach={props.playerReach}
          network={props.network}
          tokenContractAddress={props.tokenContractAddress}
          rewardType={props.rewardType}
          tokenName={props.tokenName}
          amountPerPlayer={props.amountPerPlayer}
          totalClaimables={props.totalClaimables}
          marketplaceUrl={props.marketplaceUrl}
          i18n={i18n}
        />
        <FormDepositActions
          onFormSubmit={onFormSubmit}
          depositingAmount={depositingAmount}
          i18n={i18n}
        />
      </>
    )
  }

  return (
    <ContainerInteractive
      title={title}
      icon={iconButton}
      tag={tag}
      classNames={{ root: styles.root }}
    >
      {content}
    </ContainerInteractive>
  )
}
