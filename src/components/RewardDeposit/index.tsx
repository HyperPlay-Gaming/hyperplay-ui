import React, { ReactElement } from 'react'

import Button from '../Button'
import { ContainerInteractive } from '../ContainerInteractive'
import { RewardDetails, RewardDetailsProps } from '../RewardDetails'
import styles from './RewardDeposit.module.scss'
import { FormRewards, FormRewardsProps } from './components/FormRewards'
import Sticker from '@/components/Sticker'

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
    pendingDeposit?: string
    tokenIdsTitle: string
    orAddManually: string
    callToActionAddToken: string
    addedTokenCounterText: string
    collapseAllIds: string
  }
  rewardDetailsProps: RewardDetailsProps
}

export function RewardDeposit({
  title,
  icon,
  rewardsProps,
  editable,
  updateEditable,
  i18n = { 
    confirm: 'Confirm Changes',
    pendingDeposit: 'Pending Deposit',
    tokenIdsTitle: 'Token IDs',
    orAddManually: 'Or add manually',
    callToActionAddToken: 'Add Token IDs',
    addedTokenCounterText: 'IDs added:',
    collapseAllIds: 'Collapse all IDs'
  },
  rewardDetailsProps
}: RewardDepositProps) {
  const tag: ReactElement = (
    <Sticker styleType="warning" variant="filled" className={styles.pendingDepositLabel}>
      {i18n.pendingDeposit}
    </Sticker>
  );
  let content = <RewardDetails {...rewardDetailsProps} />
  if (editable) {
    content = <FormRewards {...rewardsProps} i18n={i18n} />
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
      tag={tag}
      classNames={{ root: styles.root }}
    >
      {content}
      {confirmButton}
    </ContainerInteractive>
  )
}