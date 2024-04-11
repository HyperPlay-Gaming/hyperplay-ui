import React from 'react'

import Button from '@/components/Button'

import styles from './RewardDepositActions.module.scss'

export interface RewardDepositActionsI18nProp {
  submitBtn?: string
  totalDeposit?: string
}

export interface RewardDepositActionsProps {
  onFormSubmit: () => void
  isDisabledButton?: boolean
  depositingAmount?: string | null
  i18n?: RewardDepositActionsI18nProp
}

export const defaultI18n: RewardDepositActionsI18nProp = {
  submitBtn: 'Deposit Reward',
  totalDeposit: 'Total Deposit:'
}

export function RewardDepositActions({
  onFormSubmit = () => null,
  isDisabledButton,
  depositingAmount,
  i18n = defaultI18n
}: RewardDepositActionsProps) {
  return (
    <div className={styles.base}>
      <Button
        type="primary"
        size="medium"
        disabled={isDisabledButton}
        onClick={onFormSubmit}
      >
        {i18n.submitBtn}
      </Button>
      {depositingAmount !== null && (
        <span className={styles.totalDepositLabel}>
          {i18n.totalDeposit} {depositingAmount}
        </span>
      )}
    </div>
  )
}

export default RewardDepositActions
