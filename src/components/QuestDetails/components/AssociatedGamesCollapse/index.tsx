import React from 'react'

import { Collapse } from '@mantine/core'
import classNames from 'classnames'

import { DownArrow } from '@/assets/images'

import { Game } from '../../types'
import { EligibleGame } from '../EligibleGame'
import styles from './index.module.scss'

export interface AssociatedGamesCollapseProps {
  opened: boolean
  toggle: () => void
  games: Game[]
  i18n?: {
    associatedGames: string
    mint: string
    sync: string
    refresh: string
  }
}

export default function AssociatedGamesCollapse({
  opened,
  toggle,
  games,
  i18n = {
    associatedGames: 'Associated games',
    mint: 'Mint',
    sync: 'Sync',
    refresh: 'Refresh'
  }
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
        {games.map((game) => (
          <EligibleGame key={game.title} game={game} i18n={i18n} />
        ))}
      </Collapse>
    </div>
  )
}
