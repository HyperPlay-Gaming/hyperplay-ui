'use client'

import React from 'react'

import { TokenType } from '@/common/types'
import { getTruncatedUrl } from '@/utils/urlUtil'
import { getTruncatedAddress } from '@/utils/addressUtils'

import { ButtonCopy } from '../ButtonCopy'
import styles from './RewardsDepositedTable.module.scss'

export interface RewardDepositedTableI18nProp {
  playerReach?: string
  network?: string
  tokenContractAddress?: string
  rewardType?: string
  tokenName?: string
  amountPerPlayer?: string
  totalClaimables?: string
  marketplaceUrl?: string
  tokenType: Record<TokenType, string>,
}

export interface RewardsDepositedTableProps {
  playerReach: number
  network: string
  tokenContractAddress: string
  rewardType: TokenType
  tokenName: string
  amountPerPlayer: number
  totalClaimables: number
  marketplaceUrl: string
  i18n?: RewardDepositedTableI18nProp
}

export const defaultI18n: RewardDepositedTableI18nProp = {
  playerReach: 'Total Player Reach',
  network: 'Network',
  tokenContractAddress: 'Token Contract Address',
  rewardType: 'Reward Type',
  tokenName: 'Token Name',
  amountPerPlayer: 'Amount Per Player',
  totalClaimables: 'Total No of Claimables',
  marketplaceUrl: 'Marketplace URL',
  tokenType: {
    erc20: 'ERC-20',
    erc721: 'ERC-721',
    erc1155: 'ERC-1155'
  },
}

export function RewardsDepositedTable({
  playerReach,
  network,
  tokenContractAddress,
  rewardType,
  tokenName,
  amountPerPlayer,
  totalClaimables,
  marketplaceUrl,
  i18n = defaultI18n
}: RewardsDepositedTableProps) {
  return (
    <table className={styles.root}>
      <tr>
        <td>{i18n.playerReach}</td>
        <td>{playerReach}</td>
      </tr>
      <tr>
        <td>{i18n.network}</td>
        <td>{network}</td>
      </tr>
      <tr>
        <td>{i18n.tokenContractAddress}</td>
        <td>
          {getTruncatedAddress(tokenContractAddress)}
          <ButtonCopy
            text={tokenContractAddress}
            className={styles.copyButton}
          />
        </td>
      </tr>
      <tr>
        <td>{i18n.rewardType}</td>
        <td>{i18n.tokenType[rewardType]}</td>
      </tr>
      <tr>
        <td>{i18n.tokenName}</td>
        <td>{tokenName}</td>
      </tr>
      <tr>
        <td>{i18n.amountPerPlayer}</td>
        <td>{amountPerPlayer}</td>
      </tr>
      {totalClaimables !== null && (
        <tr>
          <td>{i18n.totalClaimables}</td>
          <td>{totalClaimables}</td>
        </tr>
      )}
      {marketplaceUrl !== null && (
        <tr>
          <td>{i18n.marketplaceUrl}</td>
          <td>
            <a target="_blank" rel="noopener noreferrer" href={marketplaceUrl}>
              {getTruncatedUrl(marketplaceUrl)}
            </a>
          </td>
        </tr>
      )}
    </table>
  )
}
