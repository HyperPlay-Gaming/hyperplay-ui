import React from 'react'

import styles from './AchievementsInfo.module.scss'

interface AchievementStatProps {
  newAchievementsValue: string
  mintedValue: string
  gamesValue: string
  title?: string
  newAchievementsTitle?: string
  mintedTitle?: string
  gamesTitle?: string
}

export function AchievementsInfo({
  title = 'Achievements',
  newAchievementsTitle = 'New Achievements',
  newAchievementsValue,
  mintedTitle = 'Minted',
  mintedValue,
  gamesTitle = 'Games',
  gamesValue
}: AchievementStatProps) {
  return (
    <div className={`${styles.card}`}>
      <h4>{title}</h4>
      <div className={styles.footer}>
        <div className={styles.stat}>
          <div className={`${styles.statTitle}`}>{newAchievementsTitle}</div>
          <h6
            className={`${styles.statValue}`}
            data-testid="newAchievementsStat"
          >
            {newAchievementsValue}
          </h6>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.statTitle}`}>{mintedTitle}</div>
          <h6 className={`${styles.statValue}`} data-testid="mintedStat">
            {mintedValue}
          </h6>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.statTitle}`}>{gamesTitle}</div>
          <h6 className={`${styles.statValue}`} data-testid="gamesStat">
            {gamesValue}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default AchievementsInfo
