import React, { ReactElement } from 'react'

import {
  RewardsDepositedTable,
  RewardsDepositedTableProps
} from '@/components/RewardsDepositedTable'
import Sticker from '@/components/Sticker'

import { ContainerInteractive } from '../ContainerInteractive'
import { RewardDetails, RewardDetailsProps } from '../RewardDetails'
import styles from './RewardDeposit.module.scss'
import { FormDepositActions } from './components/FormDepositActions'
import {
  FormDepositRewards,
  FormDepositRewardsProps
} from './components/FormDepositRewards'

export interface RewardDepositProps {
  title: string
  icon?: ReactElement
  classNames?: {
    root?: string
  }
  rewardsProps: FormDepositRewardsProps
  editable: boolean
  isDeposited?: boolean
  isFormDepositDisabled?: boolean
  depositingAmount?: string
  onFormSubmit: () => Promise<void>
  updateEditable: (editable: boolean) => void
  i18n?: {
    pendingDeposit?: string
    tokenIdsTitle: string
    orAddManually: string
    callToActionAddToken: string
    addedTokenCounterText: string
    collapseAllIds: string
    depositedLabel: string
    pressEnterToAdd: string
    submitBtn: string
    totalDeposit: string
  }
  rewardDetailsProps: RewardDetailsProps
  rewardDepositedTableProps: RewardsDepositedTableProps
}

export function RewardDeposit({
  title,
  icon,
  rewardsProps,
  editable,
  updateEditable,
  isDeposited,
  isFormDepositDisabled,
  depositingAmount,
  onFormSubmit,
  i18n = {
    pendingDeposit: 'Pending Deposit',
    tokenIdsTitle: 'Token IDs',
    orAddManually: 'Or add manually',
    callToActionAddToken: 'Add Token IDs',
    addedTokenCounterText: 'IDs added:',
    collapseAllIds: 'Collapse all IDs',
    depositedLabel: 'Deposited',
    pressEnterToAdd: 'Press enter to add',
    submitBtn: 'Deposit Reward',
    totalDeposit: 'Total Deposit:'
  },
  rewardDetailsProps,
  rewardDepositedTableProps
}: RewardDepositProps) {
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
  let content = <RewardDetails {...rewardDetailsProps} />
  if (editable) {
    content = (
      <>
        <FormDepositRewards {...rewardsProps} i18n={i18n} />
        <RewardsDepositedTable {...rewardDepositedTableProps} />
        <FormDepositActions
          onFormSubmit={async () => {
            updateEditable(false)
            await onFormSubmit()
          }}
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
      icon={icon}
      tag={tag}
      classNames={{ root: styles.root }}
    >
      {content}
    </ContainerInteractive>
  )
}
