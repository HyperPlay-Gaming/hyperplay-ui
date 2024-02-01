import React, { ReactElement } from 'react'

import cn from 'classnames'

import { ButtonCopy } from '../ButtonCopy'
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

export function RewardsSummary({
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
  function getTruncatedAddress(addr: string) {
    return addr.slice(0, 5) + '...' + addr.slice(-5)
  }

  const detailTexts = [
    chainName,
    tokenType,
    `${rewardPerPlayer} ${tokenSymbol}/${i18n.player}`,
    marketplace,
    getTruncatedAddress(tokenContractAddress)
  ]

  const detailElements = detailTexts.map((text, index) => (
    <>
      <div key={text} className="body-sm color-neutral-400">
        {text}
      </div>
      {index < detailTexts.length - 1 ? (
        <div className="center">
          <div className="circle" />
        </div>
      ) : (
        <ButtonCopy text={tokenContractAddress} />
      )}
    </>
  ))

  return (
    <div className={cn(styles.root, classNames?.root)}>
      <div className={styles.headerRow}>
        <div className="title">{title}</div>
        {icon}
      </div>
      <div className={styles.detailsRow}>{detailElements}</div>
    </div>
  )
}
