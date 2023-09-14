import { Progress } from '@mantine/core'

import styles from './AchievementProgress.module.scss'

export interface AchievementProgressProps {
  /**
   * The total number of achievements minted
   */
  safeMintedCount: number
  /**
   * The total number of achievements that exist for this game
   */
  safeTotalCount: number
  /**
   * The total progress you have made towards minting all achievements
   */
  mintedProgress: number
  /**
   * The total amount that can be minted
   * */
  mintableProgress: number
}

export default function AchievementProgress({
  safeMintedCount,
  safeTotalCount,
  mintedProgress,
  mintableProgress
}: AchievementProgressProps) {
  return (
    <div>
      <div className={styles.column}>
        <div className={styles.textContainer}>
          <div>{safeMintedCount}</div>
          <div>/</div>
          <div>{safeTotalCount}</div>
          <div>achievements minted</div>
        </div>
        <Progress
          bg="var(--color-neutral-600)"
          sections={[
            {
              value: mintedProgress,
              color: 'var(--color-success-400)'
            },
            {
              value: mintableProgress,
              color: 'var(--color-success-400-20)',
              className: styles.noRadius
            }
          ]}
        />
      </div>
    </div>
  )
}
