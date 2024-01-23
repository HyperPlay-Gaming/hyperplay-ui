import React, { ReactElement } from 'react'

import styles from './RewardsSummary.module.scss'

export interface RewardsSummaryProps {
  title: string
  chainName: string
  tokenType: string
  tokenSymbol: string
  rewardPerPlayer: string
  marketplace: string
  tokenContractAddress: string
  icon?: ReactElement
  i18n?: {
    player: string
  }
  classNames?: {
    root?: string
  }
}

export default function RewardsSummary({
  title,
  chainName,
  tokenType,
  tokenSymbol,
  rewardPerPlayer,
  marketplace,
  tokenContractAddress,
  icon,
  classNames,
  i18n = { player: 'Player' }
}: RewardsSummaryProps) {
  return (
    <div className={classNames?.root}>
      <div className={styles.headerRow}>
        <div className="title">{title}</div>
        {icon}
      </div>
    </div>
  )
}
