import React from 'react'

import { Collapse } from '@mantine/core'
import classNames from 'classnames'

import { DownArrow } from '@/assets/images'

import { Eligbility } from '../../types'
import { EligibleGame } from '../EligibleGame'
import styles from './index.module.scss'

export interface AssociatedGamesCollapseProps {
  opened: boolean
  toggle: () => void
  i18n?: {
    associatedGames: string
    mint: string
    sync: string
    refresh: string
    achievements: string
    minted: string
    completed: string
  }
  eligibility: Eligbility
}

export default function AssociatedGamesCollapse({
  opened,
  toggle,
  i18n = {
    associatedGames: 'Associated games',
    mint: 'Mint',
    sync: 'Sync',
    refresh: 'Refresh',
    achievements: 'Achievements',
    minted: 'Minted',
    completed: 'Completed'
  },
  eligibility
}: AssociatedGamesCollapseProps) {
  const downArrowClassNames: { [key: string]: boolean } = {}
  downArrowClassNames[styles.opened] = opened

  const associatedGamesClassNames: { [key: string]: boolean } = {}
  associatedGamesClassNames[styles.associatedGamesButton] = true
  associatedGamesClassNames[styles.collpased] = !opened

  return (
    <div className={styles.associatedGamesContainer}>
      <button
        onClick={toggle}
        className={classNames(associatedGamesClassNames)}
      >
        <div className="body-sm">{i18n.associatedGames}</div>
        <DownArrow
          fill="var(--color-neutral-400)"
          className={classNames(downArrowClassNames)}
        />
      </button>
      <Collapse in={opened} className={styles.associatedGamesCollapseContainer}>
        {eligibility.reputation?.games.map((game) => (
          <EligibleGame
            key={game.title}
            game={game}
            i18n={i18n}
            eligibility={eligibility}
          />
        ))}
      </Collapse>
    </div>
  )
}
