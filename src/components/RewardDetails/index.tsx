import React from 'react'

import cn from 'classnames'

import { ButtonCopy } from '@/components/ButtonCopy'
import {
  ContainerInteractive,
  ContainerInteractiveProps
} from '@/components/ContainerInteractive'
import { getTruncatedAddress } from '@/utils/addressUtils'

import styles from './RewardDetails.module.scss'

export const defaultI18n = { player: 'Player' }

export interface RewardDetailsI18nProp {
  player: string
}

export interface RewardDetailsProps extends ContainerInteractiveProps {
  chainName: string
  tokenType: string
  tokenSymbol: string
  rewardPerPlayer: string
  marketplace: string
  tokenContractAddress: string
  i18n?: RewardDetailsI18nProp
}

export function RewardDetails({
  classNames,
  chainName,
  tokenType,
  tokenSymbol,
  rewardPerPlayer,
  marketplace,
  tokenContractAddress,
  i18n = defaultI18n,
  ...props
}: RewardDetailsProps) {
  const detailTexts = [
    chainName,
    tokenType,
    `${rewardPerPlayer} ${tokenSymbol}/${i18n.player}`,
    marketplace,
    getTruncatedAddress(tokenContractAddress)
  ]

  const detailElements = detailTexts.map((text, index) => {
    if (!text) {
      return <></>
    }
    return (
      <>
        <div key={text} className="body-sm color-neutral-400">
          {`${text}`}
        </div>
        {index < detailTexts.length - 1 ? (
          <div className="center">
            <div className="circle" />
          </div>
        ) : null}
      </>
    )
  })

  return (
    <ContainerInteractive
      classNames={{
        ...classNames,
        title: cn(styles.title, classNames?.title)
      }}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.detailsRow}>{detailElements}</div>
        <ButtonCopy text={tokenContractAddress} />
      </div>
    </ContainerInteractive>
  )
}
