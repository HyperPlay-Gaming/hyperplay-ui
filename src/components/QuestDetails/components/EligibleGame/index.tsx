import cn from 'classnames'

import { AlertHexagon } from '@/assets/images'
import Button from '@/components/Button'

import { Eligbility, Game } from '../../types'
import styles from './index.module.scss'

export interface EligibleGameInterface {
  game: Game
  i18n: {
    mint: string
    sync: string
    refresh: string
  }
  eligibility: Eligbility
}

export function EligibleGame({
  game,
  i18n,
  eligibility
}: EligibleGameInterface) {
  function getRoundedPercent(numerator: number, denominator: number) {
    return Math.round((100 * numerator) / denominator)
  }
  const onChainPercentComplete = getRoundedPercent(
    game.mintedAchievementsCount,
    game.totalAchievementsCount
  )

  const offChainPercentComplete = getRoundedPercent(
    game.mintableAchievementsCount,
    game.totalAchievementsCount
  )

  const alertClasses: Record<string, boolean> = {}
  const completionPercentRequired = eligibility.reputation?.completionPercent
  if (completionPercentRequired) {
    alertClasses[styles.success] =
      onChainPercentComplete > completionPercentRequired
    alertClasses[styles.error] =
      onChainPercentComplete < completionPercentRequired
  }

  return (
    <div key={game.title} className={styles.associatedGameContainer}>
      <div className={styles.gameDetailsContainer}>
        <AlertHexagon className={cn(styles.alertIcon, alertClasses)} />
        <img src={game.imageUrl} className={styles.associatedGameThumbnail} />
        <div>
          <div className="body-sm">{game.title}</div>
          <div className="eyebrow">{`${onChainPercentComplete}% achievements`}</div>
        </div>
      </div>
      <Button type="secondary">{i18n.mint}</Button>
    </div>
  )
}
