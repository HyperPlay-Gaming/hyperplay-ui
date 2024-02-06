import React, { ReactElement } from 'react'

import Button from '../Button'
import { ContainerInteractive } from '../ContainerInteractive'
import { RewardDetails, RewardDetailsProps } from '../RewardDetails'
import styles from './RewardsSummary.module.scss'
import { FormRewards, FormRewardsProps } from './components/FormRewards'

export interface RewardsSummaryProps {
  title: string
  icon?: ReactElement
  classNames?: {
    root?: string
  }
  addERC1155TokenId: () => void
  rewardsProps: FormRewardsProps
  editable: boolean
  updateEditable: (editable: boolean) => void
  i18n?: {
    confirm?: string
  }
  rewardDetailsProps: RewardDetailsProps
}

export function RewardsSummary({
  title,
  icon,
  rewardsProps,
  editable,
  updateEditable,
  i18n = { confirm: 'Confirm' },
  rewardDetailsProps
}: RewardsSummaryProps) {
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
