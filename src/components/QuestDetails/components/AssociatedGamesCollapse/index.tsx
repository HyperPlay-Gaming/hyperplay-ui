import React from 'react'

import { Collapse } from '@mantine/core'
import classNames from 'classnames'

import { DownArrow } from '@/assets/images'
import Loading from '@/components/Loading'

import { Game } from '../../types'
import styles from './index.module.scss'

export interface AssociatedGamesCollapseProps {
  opened: boolean
  toggle: () => void
  games: Game[]
  i18n?: {
    associatedGames: string
  }
}

export default function AssociatedGamesCollapse({
  opened,
  toggle,
  games,
  i18n = {
    associatedGames: 'Associated games'
  }
}: AssociatedGamesCollapseProps) {
  const openedClassNames: { [key: string]: boolean } = {}
  openedClassNames[styles.opened] = opened

  const associatedGamesClassNames: { [key: string]: boolean } = {}
  associatedGamesClassNames[styles.associatedGamesButton] = true
  associatedGamesClassNames[styles.collpased] = !opened

  return (
    <div
      className={classNames(styles.associatedGamesContainer, openedClassNames)}
    >
      <button
        onClick={toggle}
        className={classNames(associatedGamesClassNames)}
      >
        <div className="body-sm">{i18n.associatedGames}</div>
        <DownArrow
          fill="var(--color-neutral-400)"
          className={classNames(openedClassNames)}
        />
      </button>
      <Collapse in={opened} className={styles.associatedGamesCollapseContainer}>
        {games.map((game) => {
          if (game.loading) {
            return <Loading key={`${game.title}-loading`} />
          }
          return (
            <div key={game.title} className={styles.associatedGameContainer}>
              <img
                src={game.imageUrl}
                className={styles.associatedGameThumbnail}
              />
              <div className={classNames('body-sm', styles.title)}>
                {game.title}
              </div>
            </div>
          )
        })}
      </Collapse>
    </div>
  )
}
