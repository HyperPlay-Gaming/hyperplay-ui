import React, { ReactElement } from 'react'

import { IconExclamationCircle } from '@tabler/icons-react'

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

export interface RewardDepositI18nProp extends RewardDepositedTableI18nProp {
  pendingDeposit?: string
  depositedLabel: string
}

export interface RewardDepositProps
  extends ContainerInteractiveProps,
    Omit<RewardsDepositedTableProps, 'i18n'> {
  state: 'NOT_DEPOSITED' | 'DEPOSITED'
  message?: string
  warning?: string
  i18n?: RewardDepositI18nProp
  DepositComponent?: ReactElement
  ActionComponent?: ReactElement
}

export const defaultI18n: RewardDepositI18nProp = {
  pendingDeposit: 'Pending Deposit',
  depositedLabel: 'Deposited',
  ...defaultRewardDepositedTableI18n
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
      {props.DepositComponent}
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
      {props.ActionComponent}
    </ContainerInteractive>
  )
}

export default RewardDeposit
