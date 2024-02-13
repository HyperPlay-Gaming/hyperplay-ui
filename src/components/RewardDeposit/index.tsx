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
import { FormDepositActions } from './components/FormDepositActions'
import {
  FormDepositRewardI18nProp,
  FormDepositRewards,
  FormDepositRewardsProps
} from './components/FormDepositRewards'

export const defaultI18n = {
  remove: 'Remove',
  pendingDeposit: 'Pending Deposit',
  tokenIdsTitle: 'Token IDs',
  orAddManually: 'Or add manually',
  callToActionAddToken: 'Add Token IDs',
  addedTokenCounterText: 'IDs added:',
  collapseAllIds: 'Collapse all IDs',
  depositedLabel: 'Deposited',
  pressEnterToAdd: 'Press enter to add',
  submitBtn: 'Deposit Reward',
  totalDeposit: 'Total Deposit:',
  selectRewardTokenType: 'Select Reward Type',
  placeholder: {
    tokenFrom: '0',
    tokenTo: '99',
    amountPerUser: 'Paste token ID',
    totalPlayerReach: '0',
    tokenIdGold: 'Paste token ID',
    tokenIdSilver: 'Paste token ID',
    totalPlayerReachGold: '0',
    totalPlayerReachSilver: '0'
  },
  label: {
    tokenFrom: 'From',
    tokenTo: 'To',
    amountPerUser: 'Token ID',
    totalPlayerReach: 'Enter Total Player Reach',
    tokenIdGold: 'Token ID: GOLD',
    tokenIdSilver: 'Token ID: SILVER',
    totalPlayerReachGold: 'Total Player Reach: GOLD',
    totalPlayerReachSilver: 'Total Player Reach: SILVER'
  },
  ...defaultRewardDepositedTableI18n,
  ...defaultRewardDetailsI18n
}

interface RewardDepositI18nProp
  extends FormDepositRewardI18nProp,
    RewardDetailsI18nProp,
    RewardDepositedTableI18nProp {
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
  editable: boolean
  isDeposited?: boolean
  isFormDepositDisabled?: boolean
  depositingAmount?: string
  onEditableChange: (editable: unknown) => void
  onRemoveTap: () => void
  i18n?: RewardDepositI18nProp
}

export function RewardDeposit({
  title,
  isDeposited,
  isFormDepositDisabled,
  depositingAmount,
  editable: editableInit,
  onEditableChange,
  tokenIdsList,
  isAddTokenButtonDisabled,
  onAddTokenTap = () => null,
  i18n = defaultI18n,
  onRemoveTap,
  ...props
}: RewardDepositProps) {
  const [editable, setEditable] = useState(editableInit)
  const updateEditable = (edit: boolean) => {
    onEditableChange(edit)
    setEditable(edit)
  }

  const tag: ReactElement = isDeposited ? (
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
    <button onClick={() => updateEditable(true)}>
      <IconEdit color="var(--color-neutral-400)" />
    </button>
  )
  if (editable) {
    iconButton = (
      <Button
        type="tertiary"
        rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
        onClick={onRemoveTap}
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
  if (editable) {
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
          onEditableChange={async () => updateEditable(true)}
          isDisabledButton={isFormDepositDisabled}
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
