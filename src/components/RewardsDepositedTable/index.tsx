'use client'

import React from 'react'

import { TokenType } from '@/common/types'
import { getTruncatedAddress } from '@/utils/addressUtils'
import { getTruncatedUrl } from '@/utils/urlUtil'

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
  tokenType: Record<TokenType, string>
}

export interface RewardsDepositedTableProps {
  playerReach?: string
  network: string
  tokenContractAddress: string
  rewardType: TokenType
  tokenName: string
  amountPerPlayer?: number
  totalClaimables?: number
  marketplaceUrl?: string
  extraFields?: Record<string, string>
  i18n?: RewardDepositedTableI18nProp
}

export const defaultI18n: RewardDepositedTableI18nProp = {
  playerReach: 'Total Player Reach',
  network: 'Network',
  tokenContractAddress: 'Token Contract Address',
  rewardType: 'Reward Type',
  tokenName: 'Token Name(s)',
  amountPerPlayer: 'Amount Per Player',
  totalClaimables: 'Total No of Claimables',
  marketplaceUrl: 'Marketplace URL',
  tokenType: {
    erc20: 'ERC-20',
    erc721: 'ERC-721',
    erc1155: 'ERC-1155'
  }
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
  extraFields,
  i18n = defaultI18n
}: RewardsDepositedTableProps) {
  return (
    <table className={styles.root}>
      <tbody>
        {playerReach && (
          <tr>
            <td>{i18n.playerReach}</td>
            <td>{playerReach}</td>
          </tr>
        )}
        <tr>
          <td>{i18n.network}</td>
          <td>{network}</td>
        </tr>
        <tr>
          <td>{i18n.tokenContractAddress}</td>
          <td className={styles.copyCell}>
            {getTruncatedAddress(tokenContractAddress)}
            <ButtonCopy text={tokenContractAddress} />
          </td>
        </tr>
        <tr>
          <td>{i18n.rewardType}</td>
          <td>{i18n.tokenType[rewardType]}</td>
        </tr>
        {totalClaimables !== undefined && (
          <tr>
            <td>{i18n.totalClaimables}</td>
            <td>{totalClaimables}</td>
          </tr>
        )}
        <tr>
          <td>{i18n.tokenName}</td>
          <td>{tokenName}</td>
        </tr>
        {amountPerPlayer !== undefined && (
          <tr>
            <td>{i18n.amountPerPlayer}</td>
            <td>{amountPerPlayer}</td>
          </tr>
        )}
        {marketplaceUrl !== undefined && (
          <tr>
            <td>{i18n.marketplaceUrl}</td>
            <td className={styles.copyCell}>
              {getTruncatedUrl(marketplaceUrl)}
              <ButtonCopy text={marketplaceUrl} />
            </td>
          </tr>
        )}
        {extraFields !== undefined &&
          Object.entries(extraFields).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
