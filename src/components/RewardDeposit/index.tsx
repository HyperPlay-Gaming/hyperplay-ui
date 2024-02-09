import React, { ReactElement } from 'react'

import Button from '../Button'
import { ContainerInteractive } from '../ContainerInteractive'
import { RewardDetails, RewardDetailsProps } from '../RewardDetails'
import styles from './RewardDeposit.module.scss'
import { FormRewards, FormRewardsProps } from './components/FormRewards'

export interface RewardDepositProps {
  title: string
  icon?: ReactElement
  classNames?: {
    root?: string
  }
  rewardsProps: FormRewardsProps
  editable: boolean
  updateEditable: (editable: boolean) => void
  i18n?: {
    confirm?: string
  }
  rewardDetailsProps: RewardDetailsProps
}

export function RewardDeposit({
  title,
  icon,
  rewardsProps,
  editable,
  updateEditable,
  i18n = { confirm: 'Confirm Changes' },
  rewardDetailsProps
}: RewardDepositProps) {
  let content = <RewardDetails {...rewardDetailsProps} />
  if (editable) {
    content = <FormRewards {...rewardsProps} />
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
      icon={icon}
      classNames={{ root: styles.root }}
    >
      {content}
      {confirmButton}
    </ContainerInteractive>
  )
}
