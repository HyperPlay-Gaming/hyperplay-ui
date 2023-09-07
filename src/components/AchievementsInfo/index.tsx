import React from 'react'

import styles from './AchievementsInfo.module.scss'

interface AchievementStatProps {
  newAchievements: string
  minted: string
  games: string
}

export function AchievementsInfo({
  newAchievements,
  minted,
  games
}: AchievementStatProps) {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.header}`}>
        <h4>Achievements</h4>
      </div>
      <div className={styles.footer}>
        <div className={styles.stat}>
          <div className={`${styles.statTitle}`}>New Achievements</div>
          <h6
            className={`${styles.statValue}`}
            data-testid="newAchievementsStat"
          >
            {newAchievements}
          </h6>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.statTitle}`}>Minted</div>
          <h6 className={`${styles.statValue}`} data-testid="mintedStat">
            {minted}
          </h6>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.statTitle}`}>Games</div>
          <h6 className={`${styles.statValue}`} data-testid="gamesStat">
            {games}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default AchievementsInfo
