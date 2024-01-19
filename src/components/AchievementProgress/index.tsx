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
   * The total progress you have made towards minting all achievements in percent
   */
  mintedProgress: number
  /**
   * The total amount that can be minted in percent
   * */
  mintableProgress: number
  /**
   * Optional icon to the right of the progress bar in the same row
   */
  rightIcon?: React.ReactNode
}

export default function AchievementProgress({
  safeMintedCount,
  safeTotalCount,
  mintedProgress,
  mintableProgress,
  i18n = {
    achievementMintedLabel: 'achievements minted'
  },
  rightIcon
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
        <div className={styles.progressRow}>
          <Progress.Root
            className={styles.progressRow}
            classNames={{ section: styles.progressSection }}
            bg="var(--color-neutral-600)"
            unstyled
          >
            <Progress.Section
              color="var(--color-success-400)"
              value={mintedProgress}
            ></Progress.Section>
            <Progress.Section
              color="var(--color-success-400-20)"
              value={mintableProgress}
              className={styles.noRadius}
            />
          </Progress.Root>
          {rightIcon}
        </div>
      </div>
    </div>
  )
}
