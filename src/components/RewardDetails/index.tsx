'use client'

import React from 'react'

import cn from 'classnames'

import '../ButtonCopy'
import styles from './RewardDetails.module.scss'

export interface RewardDetailsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  chainName: string
  tokenType: string
  tokenSymbol: string
  rewardPerPlayer: string
  marketplace: string
  tokenContractAddress: string
  i18n?: {
    player: string
  }
}

export function RewardDetails({
  chainName,
  tokenType,
  tokenSymbol,
  rewardPerPlayer,
  marketplace,
  tokenContractAddress,
  i18n = { player: 'Player' },
  className,
  ...props
}: RewardDetailsProps) {
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
    <div className={cn(styles.detailsRow, className)} {...props}>
      {detailElements}
    </div>
  )
}
