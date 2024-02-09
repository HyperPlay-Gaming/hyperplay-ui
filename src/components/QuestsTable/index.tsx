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
  if (filter === 'ACTIVE') {
    filteredQuests = filteredQuests.filter((val) => val.status === 'ACTIVE')
  } else if (filter === 'INACTIVE') {
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
      <div>
        <Button type="tertiary" onClick={() => setFilter('ACTIVE')}>
          {i18n.active}
        </Button>
        <Button type="tertiary" onClick={() => setFilter('INACTIVE')}>
          {i18n.inactive}
        </Button>
      </div>
      <table>
        {filteredQuests.map((quest) => (
          <div key={quest.name} className={styles.rowContainer}>
            <tr>
              <td>{i18n.name}</td>
              <td>{i18n.games}</td>
              <td>{i18n.reward}</td>
              <td>{i18n.balance}</td>
              <td>{i18n.status}</td>
            </tr>
            <tr>
              <td>{quest.name}</td>
              <td>{quest.numGames}</td>
              <td>{getRewardString(quest)}</td>
              <td>{getBalanceString(quest)}</td>
              <td>{quest.status}</td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  )
}
