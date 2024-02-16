import React from 'react'

import Button from '@/components/Button'

import styles from './FormDepositActions.module.scss'

export interface FormDepositActionsI18nProp {
  submitBtn?: string
  totalDeposit?: string
}

export interface FormDepositActionsProps {
  onFormSubmit: () => void
  isDisabledButton?: boolean
  depositingAmount?: string | null
  i18n?: FormDepositActionsI18nProp
}

export const defaultI18n: FormDepositActionsI18nProp = {
  submitBtn: 'Deposit Reward',
  totalDeposit: 'Total Deposit:'
}


export function FormDepositActions({
  onFormSubmit = () => null,
  isDisabledButton,
  depositingAmount,
  i18n = defaultI18n
}: FormDepositActionsProps) {
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
