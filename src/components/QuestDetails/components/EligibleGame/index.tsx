import Button from '@/components/Button'

import { Game } from '../../types'
import styles from './index.module.scss'

export interface EligibleGameInterface {
  game: Game
  i18n: {
    mint: string
    sync: string
    refresh: string
  }
}

export function EligibleGame({ game, i18n }: EligibleGameInterface) {
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
  console.log('i18n ', i18n)

  return (
    <div key={game.title} className={styles.associatedGameContainer}>
      <div className={styles.gameDetailsContainer}>
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
