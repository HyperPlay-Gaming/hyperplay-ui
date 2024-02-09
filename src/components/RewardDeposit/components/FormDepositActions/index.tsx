import React from 'react'
import Button from '@/components/Button'
import styles from './FormDepositActions.module.scss'

export interface FormDepositActionsProps {
  onFormSubmit: () => void
  isDisabledButton?: boolean
  depositingAmount?: string | null
  i18n?: {
    submitBtn: string
    totalDeposit: string
  }
}

export function FormDepositActions({
  onFormSubmit = () => null,
  isDisabledButton,
  depositingAmount,
  i18n = {
    submitBtn: 'Deposit Reward',
    totalDeposit: 'Total Deposit:'
  }
}: FormDepositActionsProps) {
  return (
    <div className={styles.base}>
      <Button
        type="primary"
        size="large"
        disabled={isDisabledButton}
        onClick={onFormSubmit}
      >
        {i18n.submitBtn}
      </Button>
      {
        depositingAmount !== null && (
          <span className={styles.totalDepositLabel}>
            {i18n.totalDeposit} {depositingAmount}
          </span>
        )
      } 
    </div>
  )
}
