import React, { ReactElement } from 'react'

import { ContainerInteractive } from '../ContainerInteractive'
import styles from './RewardsSummary.module.scss'
import { FormRewards } from './components/FormRewards'

export interface RewardsSummaryProps {
  title: string
  icon?: ReactElement
  classNames?: {
    root?: string
  }
  addERC1155TokenId: () => void
  i18n?: {
    addTokenId?: string
  }
}

export function RewardsSummary({
  title,
  icon,
  i18n = { addTokenId: 'Add Token ID' }
}: RewardsSummaryProps) {
  return (
    <ContainerInteractive title={title} icon={icon}>
      <FormRewards i18n={i18n} />
    </ContainerInteractive>
  )
}
