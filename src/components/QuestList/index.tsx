import classNames from 'classnames'
import { QuestListProps } from './types'
import { Refresh } from '@/assets/images'
import { ReactComponent as Lightning } from '@/assets/images/LightningOutlined.svg'
import { ReactComponent as QuestIconTwo } from '@/assets/images/QuestIcon2.svg'
import { ReactComponent as QuestIcon } from '@/assets/images/QuestIcon.svg'
import Button from '@/components/Button'
import Sticker from '@/components/Sticker'
import styles from './index.module.scss'

export default function QuestList({ i18n }: QuestListProps) {
  const readyForClaimQuests = [
    {
      id: 1,
      title: 'Play Streak',
      duration: '0 / 7 days',
      resetTime: 'Day resets:',
      time: '23:43:03 (UTC)',
      questType: 'PLAYSTREAK',
      reward: '+200 G7C'
    }
  ]
  const activeQuests = [
    {
      id: 2,
      title: 'Play Streak',
      duration: '0 / 7 days',
      resetTime: 'Day resets:',
      time: '23:43:03 (UTC)',
      questType: 'PLAYSTREAK',
      reward: '+200 G7C'
    }
  ]

  return (
    <div>
      <div className={styles.header}>
        <p className={classNames('title', styles.questTitle)}>Quests</p>
        <Button
          type="link"
          size="small"
          htmlType="button"
          className={styles.viewAllButton}
        >
          {i18n?.viewAllButton}
        </Button>
      </div>

      <div className={styles.questList}>
        {/* Ready for Claim */}
        <div className={styles.readyForClaim}>
          <p className={styles.readyForClaimTitle}>
            <QuestIcon className={styles.questIcon} />
            Ready for Claim
          </p>
          <Sticker styleType="secondary" variant="filledStrong">
            Label
          </Sticker>
        </div>
        {readyForClaimQuests.map((quest) => (
          <div key={quest.id} className={styles.card}>
            <div className={styles.firstRow}>
              <p className={classNames('title', styles.days)}>0 / 7 days</p>
              <div className={styles.badges}>
                <p className={styles.badgesSpace}>
                  <Sticker styleType="tertiary" variant="outlined">
                    <Refresh className={styles.badgeIcon} />
                    Weekly
                  </Sticker>
                  <Sticker styleType="tertiary" variant="outlined">
                    2x
                  </Sticker>
                </p>
                <p className={styles.resetTime}>
                  Day resets:{' '}
                  <span className={styles.time}>23:43:03 (UTC)</span>
                </p>
              </div>
            </div>
            <div className={styles.secondRow}>
              <p className={styles.questType}>
                <Lightning className={styles.lightningIcon} />
                Play Streak
              </p>
              <p className={styles.rewardType}>+200 G7C</p>
            </div>
          </div>
        ))}

        {/* Active Quests */}
        <div className={styles.activeQuests}>
          <p className={styles.activeQuestsTitle}>
            <QuestIconTwo className={styles.QuestIcoTwo} /> Active
          </p>
          <Sticker styleType="secondary" variant="filledStrong">
            Label
          </Sticker>
        </div>
        {activeQuests.map((quest) => (
          <div key={quest.id} className={styles.card}>
            <div className={styles.firstRow}>
              <p className={classNames('title', styles.days)}>0 / 7 days</p>
              <div className={styles.badges}>
                <p className={styles.badgesSpace}>
                  <Sticker styleType="tertiary" variant="outlined">
                    <Refresh className={styles.badgeIcon} />
                    Weekly
                  </Sticker>
                  <Sticker styleType="tertiary" variant="outlined">
                    2x
                  </Sticker>
                </p>
                <p className={styles.resetTime}>
                  Day resets:{' '}
                  <span className={styles.time}>23:43:03 (UTC)</span>
                </p>
              </div>
            </div>
            <div className={styles.secondRow}>
              <p className={classNames('body', styles.questType)}>
                <Lightning className={styles.lightningIcon} />
                Play Streak
              </p>
              <p className={styles.rewardType}>+200 G7C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
