'use client'

import React, { useState } from 'react'

import Button from '../Button'
import styles from './QuestsTable.module.scss'

export interface RewardSimple {
  amountPerPlayer: number
  symbol: string
  balance: number
}

export interface Quest {
  name: string
  rewards: RewardSimple[]
  numGames: number
  status: 'DRAFT' | 'ACTIVE'
}

export interface QuestsTableProps {
  quests: Quest[]
  i18n?: {
    name?: string
    games?: string
    reward?: string
    balance?: string
    claims?: string
    status?: string
    player?: string
    active?: string
    inactive?: string
  }
}

export function QuestsTable({
  quests,
  i18n = {
    name: 'Name',
    games: 'Games',
    reward: 'Reward',
    balance: 'Balance',
    claims: 'Claims',
    status: 'Status',
    player: 'Player',
    active: 'Active',
    inactive: 'Inactive'
  }
}: QuestsTableProps) {
  const [filter, setFilter] = useState<null | 'ACTIVE' | 'INACTIVE'>(null)

  let filteredQuests = quests
  const isActive = filter === 'ACTIVE'
  const isInactive = filter === 'INACTIVE'
  const noFilterSelected = filter === null
  if (isActive) {
    filteredQuests = filteredQuests.filter((val) => val.status === 'ACTIVE')
  } else if (isInactive) {
    filteredQuests = filteredQuests.filter((val) => val.status !== 'ACTIVE')
  }

  function getRewardString(quest: Quest) {
    let rewardString = ''
    quest.rewards.forEach(
      (val) =>
        (rewardString += `${val.amountPerPlayer}${val.symbol} / ${i18n.player}`)
    )
    return rewardString
  }
  function getBalanceString(quest: Quest) {
    let rewardString = ''
    quest.rewards.forEach(
      (val, index) =>
        (rewardString += `${val.balance} ${val.symbol}${
          index < quest.rewards.length - 1 ? ',' : ''
        }`)
    )
    return rewardString
  }
  return (
    <div>
      <div className={styles.actionButtonRow}>
        <Button
          type={isActive ? 'secondary' : 'tertiary'}
          onClick={() => {
            if (isInactive || noFilterSelected) {
              setFilter('ACTIVE')
            } else if (isActive) {
              setFilter(null)
            }
          }}
        >
          {i18n.active}
        </Button>
        <Button
          type={isInactive ? 'secondary' : 'tertiary'}
          onClick={() => {
            if (isActive || noFilterSelected) {
              setFilter('INACTIVE')
            } else if (isInactive) {
              setFilter(null)
            }
          }}
        >
          {i18n.inactive}
        </Button>
      </div>
      <table className={styles.questsTableContainer}>
        {filteredQuests.map((quest) => (
          <tr key={quest.name} className={styles.rowContainer}>
            <td>
              <div>{i18n.name}</div>
              <div>{quest.name}</div>
            </td>
            <td>
              <div>{i18n.games}</div>
              <div>{quest.numGames}</div>
            </td>
            <td>
              <div>{i18n.reward}</div>
              <div>{getRewardString(quest)}</div>
            </td>
            <td>
              <div>{i18n.balance}</div>
              <div>{getBalanceString(quest)}</div>
            </td>
            <td>
              <div>{i18n.status}</div>
              <div>{quest.status}</div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}
