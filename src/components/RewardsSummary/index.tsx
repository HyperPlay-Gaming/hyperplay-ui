import React, { ReactElement } from 'react'

import { ContainerInteractive } from '../ContainerInteractive'
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
}

export function RewardsSummary({
  title,
  icon,
  rewardsProps
}: RewardsSummaryProps) {
  return (
    <ContainerInteractive title={title} icon={icon}>
      <FormRewards {...rewardsProps} />
    </ContainerInteractive>
  )
}
