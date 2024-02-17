import React from 'react'

import { Collapse } from '@mantine/core'
import classNames from 'classnames'

import { DownArrow } from '@/assets/images'

import { Eligbility, QuestDetailsI18n } from '../../types'
import { replacePercentInString } from '../../utils'
import { EligibleGame } from '../EligibleGame'
import styles from './index.module.scss'

export interface AssociatedGamesCollapseProps {
  opened: boolean
  toggle: () => void
  i18n: QuestDetailsI18n
  eligibility: Eligbility
}

export default function AssociatedGamesCollapse({
  opened,
  toggle,
  i18n,
  eligibility
}: AssociatedGamesCollapseProps) {
  const downArrowClassNames: { [key: string]: boolean } = {}
  downArrowClassNames[styles.opened] = opened

  const associatedGamesClassNames: { [key: string]: boolean } = {}
  associatedGamesClassNames[styles.associatedGamesButton] = true
  associatedGamesClassNames[styles.collpased] = !opened

  const requiresCompletion = replacePercentInString(
    i18n.questRequiresCompletion,
    eligibility.reputation?.completionPercent ?? 100
  )

  return (
    <div className={styles.associatedGamesContainer}>
      <button
        onClick={toggle}
        className={classNames(associatedGamesClassNames)}
      >
        <div className={styles.gamesTitleContainer}>
          <div className="title-sm">{i18n.eligibleGames}</div>
          <div className={classNames('caption', 'color-neutral-400')}>
            {requiresCompletion}
          </div>
        </div>
        <DownArrow
          fill="var(--color-neutral-400)"
          className={classNames(styles.downArrow, downArrowClassNames)}
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
