'use client'

import React from 'react'

import cn from 'classnames'

import Button from '../Button'
import styles from './QuestsTable.module.scss'

export interface RewardSimple {
  amountPerPlayer: number
  symbol: string
  balance: number
}

export type statusType = 'DRAFT' | 'ACTIVE'

export interface QuestsTableI18n {
  name?: string
  type?: string
  rewardPerPlayer?: string
  balance?: string
  claims?: string
  status?: string
  player?: string
  active?: string
  inactive?: string
  draft?: string
}

function getStatusDisplayName(status: statusType, i18n: QuestsTableI18n) {
  switch (status) {
    case 'DRAFT':
      return i18n.draft
      break
    case 'ACTIVE':
      return i18n.active
      break
    default:
      return '???'
      break
  }
}

export interface Quest {
  name: string
  type?: string
  rewards: RewardSimple[]
  status: statusType
  onClick?: () => void
  claims: number
  id?: string | number
  /* eslint-disable-next-line */
  linkComponent?: any
  /* eslint-disable-next-line */
  linkProps?: any
}

export interface QuestsTableProps {
  filter: 'ACTIVE' | 'INACTIVE' | null
  onFilterChange: (filter: 'ACTIVE' | 'INACTIVE' | null) => void
  quests: Quest[]
  i18n?: QuestsTableI18n
}

export function QuestsTable({
  quests,
  filter,
  onFilterChange,
  i18n = {
    name: 'Name',
    type: 'Type',
    rewardPerPlayer: 'Reward / Player',
    balance: 'Balance',
    claims: 'Claims',
    status: 'Status',
    player: 'Player',
    active: 'Active',
    inactive: 'Inactive',
    draft: 'Draft'
  }
}: QuestsTableProps) {
  let filteredQuests = quests
  const isActive = filter === 'ACTIVE'
  const isInactive = filter === 'INACTIVE'
  const noFilterSelected = filter === null
  if (isActive) {
    filteredQuests = filteredQuests.filter((val) => val.status === 'ACTIVE')
  } else if (isInactive) {
    filteredQuests = filteredQuests.filter((val) => val.status !== 'ACTIVE')
  }

  function getStringFromArray(
    rewards: RewardSimple[],
    getStringFromReward: (reward: RewardSimple) => string
  ) {
    let rewardString = ''
    for (let i = 0; i < 2 && i < rewards.length; ++i) {
      const val = rewards[i]
      if (i === 1) {
        rewardString += ', '
      }
      rewardString += getStringFromReward(val)
    }
    const numOfRewardsLeft = rewards.length - 2
    if (numOfRewardsLeft > 0) {
      rewardString += `, +${numOfRewardsLeft} more`
    }

    return rewardString
  }

  function getRewardString(quest: Quest) {
    return getStringFromArray(
      quest.rewards,
      (reward: RewardSimple) => `${reward.amountPerPlayer} ${reward.symbol}`
    )
  }

  function getBalanceString(quest: Quest) {
    return getStringFromArray(
      quest.rewards,
      (reward: RewardSimple) => `${reward.balance} ${reward.symbol}`
    )
  }

  return (
    <div>
      <div className={styles.actionButtonRow}>
        <Button
          type={isActive ? 'secondary' : 'tertiary'}
          onClick={() => {
            if (isInactive || noFilterSelected) {
              onFilterChange('ACTIVE')
            } else if (isActive) {
              onFilterChange(null)
            }
          }}
        >
          {i18n.active}
        </Button>
        <Button
          type={isInactive ? 'secondary' : 'tertiary'}
          onClick={() => {
            if (isActive || noFilterSelected) {
              onFilterChange('INACTIVE')
            } else if (isInactive) {
              onFilterChange(null)
            }
          }}
        >
          {i18n.inactive}
        </Button>
      </div>
      <table className={styles.questsTableContainer}>
        <tbody>
          {filteredQuests.map((quest) => {
            const LinkComponent = quest.linkComponent ?? React.Fragment
            return (
              <tr
                key={quest.name}
                className={styles.rowContainer}
                onClick={quest.onClick}
              >
                <td>
                  <LinkComponent {...quest.linkProps}>
                    <div>{i18n.name}</div>
                    <div>{quest.name}</div>
                  </LinkComponent>
                </td>
                <td>
                  <LinkComponent {...quest.linkProps}>
                    <div>{i18n.type}</div>
                    <div>{quest.type}</div>
                  </LinkComponent>
                </td>
                <td>
                  <LinkComponent {...quest.linkProps}>
                    <div>{i18n.rewardPerPlayer}</div>
                    <div>{getRewardString(quest)}</div>
                  </LinkComponent>
                </td>
                <td>
                  <LinkComponent {...quest.linkProps}>
                    <div>{i18n.balance}</div>
                    <div>{getBalanceString(quest)}</div>
                  </LinkComponent>
                </td>
                <td>
                  <LinkComponent {...quest.linkProps}>
                    <div>{i18n.claims}</div>
                    <div>{quest.claims}</div>
                  </LinkComponent>
                </td>
                <td>
                  <LinkComponent {...quest.linkProps}>
                    <div>{i18n.status}</div>
                    <div className={styles.statusContainer}>
                      <div
                        className={cn(
                          'circle',
                          styles.statusCircle,
                          styles[quest.status]
                        )}
                      ></div>
                      {getStatusDisplayName(quest.status, i18n)}
                    </div>
                  </LinkComponent>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
