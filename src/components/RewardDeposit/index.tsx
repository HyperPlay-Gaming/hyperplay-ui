import React, { ReactElement } from 'react'

import { IconExclamationCircle } from '@tabler/icons-react'

import {
  FormDepositActions,
  FormDepositActionsI18nProp,
  FormDepositActionsProps,
  defaultI18n as defaultFormDepositActionsI18n
} from '@/components/RewardDeposit/components/FormDepositActions'
import {
  RewardDepositedTableI18nProp,
  RewardsDepositedTable,
  RewardsDepositedTableProps,
  defaultI18n as defaultRewardDepositedTableI18n
} from '@/components/RewardsDepositedTable'
import Sticker from '@/components/Sticker'

import {
  ContainerInteractive,
  ContainerInteractiveProps
} from '../ContainerInteractive'
import styles from './RewardDeposit.module.scss'

interface RewardDepositI18nProp
  extends RewardDepositedTableI18nProp,
    FormDepositActionsI18nProp {
  pendingDeposit?: string
  depositedLabel: string
}

export interface RewardDepositProps
  extends ContainerInteractiveProps,
    Omit<FormDepositActionsProps, 'i18n'>,
    Omit<RewardsDepositedTableProps, 'i18n'> {
  state: 'NOT_DEPOSITED' | 'DEPOSITED'
  message?: string
  warning?: string
  i18n?: RewardDepositI18nProp
}

export const defaultI18n: RewardDepositI18nProp = {
  pendingDeposit: 'Pending Deposit',
  depositedLabel: 'Deposited',
  ...defaultRewardDepositedTableI18n,
  ...defaultFormDepositActionsI18n
}

export function RewardDeposit({
  title,
  state,
  i18n = defaultI18n,
  message,
  warning,
  ...props
}: RewardDepositProps) {
  let tag: ReactElement

  if (state === 'NOT_DEPOSITED') {
    tag = (
      <Sticker
        styleType="warning"
        variant="filled"
        className={styles.pendingDepositLabel}
      >
        {i18n.pendingDeposit}
      </Sticker>
    )
  } else {
    tag = (
      <Sticker
        styleType="success"
        variant="filled"
        className={styles.successDepositLabel}
      >
        {i18n.depositedLabel}
      </Sticker>
    )
  }

  return (
    <ContainerInteractive
      title={title}
      tag={tag}
      classNames={{ root: styles.root, title: styles.title }}
      {...props}
    >
      {props.children}
      {message && (
        <div className={styles.messageContainer}>
          <span className={styles.message}>{message}</span>
        </div>
      )}
      <RewardsDepositedTable {...props} />
      {warning && (
        <div className={styles.warningContainer}>
          <IconExclamationCircle size={20} />
          <span className={styles.warningMessage}>{warning}</span>
        </div>
      )}
      <FormDepositActions {...props} />
    </ContainerInteractive>
  )
}
