import { Progress } from '@mantine/core'
import classNames from 'classnames'

import styles from './AchievementProgress.module.scss'

export interface AchievementProgressTextProps {
  i18n?: {
    /**
     * The label to display for the progress label for how many you've minted
     */
    achievementMintedLabel?: string
  }
}

export interface AchievementProgressProps extends AchievementProgressTextProps {
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
  mintableProgress,
  i18n = {
    achievementMintedLabel: 'achievements minted'
  }
}: AchievementProgressProps) {
  return (
    <div>
      <div className={styles.column}>
        <div className={classNames(styles.textContainer, styles.noWrap)}>
          <div>{safeMintedCount}</div>
          <div>/</div>
          <div>{safeTotalCount}</div>
          <div>{i18n.achievementMintedLabel}</div>
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
