import React from 'react'
import Button from '@/components/Button'
import styles from './FormActions.module.scss'

export interface FormActionsProps {
  onFormSubmit: () => void
  isDisabledButton?: boolean
  depositAmount?: string | null
  i18n?: {
    submitBtn: string
    totalDeposit: string
  }
}

export function FormActions({
  onFormSubmit = () => null,
  isDisabledButton,
  depositAmount,
  i18n = {
    submitBtn: 'Deposit Reward',
    totalDeposit: 'Total Deposit:'
  }
}: FormActionsProps) {
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
        depositAmount !== null && (
          <span className={styles.totalDepositLabel}>
            {i18n.totalDeposit} {depositAmount}
          </span>
        )
      } 
    </div>
  )
}
