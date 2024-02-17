import cn from 'classnames'

import { AlertHexagon } from '@/assets/images'
import Button from '@/components/Button'

import { Eligbility, Game, QuestDetailsI18n } from '../../types'
import styles from './index.module.scss'

export interface EligibleGameInterface {
  game: Game
  i18n: QuestDetailsI18n
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

  let mintedTextCaption = ''
  if (game.minted) {
    mintedTextCaption = `${onChainPercentComplete}% ${i18n.achievements} ${i18n.minted}`
  } else {
    mintedTextCaption = `${offChainPercentComplete}% ${i18n.achievements} ${i18n.completed}`
  }

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
          <div className={cn('eyebrow', alertClasses)}>{mintedTextCaption}</div>
        </div>
      </div>
      <Button type="secondary" size="small">
        {i18n.mint}
      </Button>
    </div>
  )
}
