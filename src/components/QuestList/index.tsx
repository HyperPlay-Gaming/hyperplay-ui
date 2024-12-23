import { HTMLProps } from 'react'

import { Quest as BaseQuest } from '@hyperplay/utils'
import classNames from 'classnames'

import { Refresh } from '@/assets/images'
import { ReactComponent as Lightning } from '@/assets/images/lightning-02.svg'
import { ReactComponent as QuestIconTwo } from '@/assets/images/quest-icon-2.svg'
import { ReactComponent as QuestIcon } from '@/assets/images/quest-icon.svg'
import { QuestType } from '@/common/types'
import Button from '@/components/Button'

import Sticker from '@/components/Sticker'
import styles from './index.module.scss'

interface Quest extends BaseQuest {
  state: 'READY_FOR_CLAIM' | 'ACTIVE'
}

export interface QuestListProps extends Quest {
  onClick: () => void
  selected?: boolean
  state: 'READY_FOR_CLAIM' | 'ACTIVE'
  className?: string
  i18n?: {
    quests: string
    viewAllButton: string
  }
  quests: Quest[]
}

export default function QuestList({
  selected,
  i18n,
  quests,
  onClick,
  className,
  state,
  ...props
}: QuestListProps) {
   
    const activeQuests = quests.filter((val) => val.state === 'ACTIVE')

    const readyForClaimQuests = quests.filter(
      (val) => val.state === 'READY_FOR_CLAIM'
    )

    return (
      <div className={classNames(styles.component)}>
        <div className={classNames(styles.header)}>
          <p className={classNames('title', styles.questTitle)}>
            {i18n?.quests}
          </p>
          <Button
            type="link"
            size="small"
            htmlType="button"
            className={styles.viewAllButton}
          >
            {i18n?.viewAllButton}
          </Button>
        </div>

        <div className={classNames(styles.questList)}>
          {/* Ready for Claim */}
          <div className={classNames(styles.readyForClaim)}>
            <p className={classNames(styles.readyForClaimTitle)}>
              <QuestIcon className={classNames(styles.QuestIcon)} />
              Ready for Claim
            </p>
            <Sticker styleType="secondary" variant="filledStrong">
              Label
            </Sticker>
          </div>

          {readyForClaimQuests.map((quest) => (
            <div key={quest.id} className={classNames(styles.card)}>
              <div className={classNames(styles.firstRow)}>
                <p className={classNames('title', styles.days)}>0 / 7 days</p>
                <div className={classNames(styles.badges)}>
                  <p className={classNames('body', styles.badgesSpace)}>
                    <Sticker styleType="tertiary" variant="outlined">
                      <Refresh className={classNames(styles.badgeIcon)} />
                      Weekly
                    </Sticker>
                    <Sticker styleType="tertiary" variant="outlined">
                      2x
                    </Sticker>
                  </p>
                  <p className={classNames('body', styles.resetTime)}>
                    Day resets:{' '}
                    <span className={classNames(styles.time)}>
                      23:43:03 (UTC)
                    </span>
                  </p>
                </div>
              </div>
              <div className={classNames(styles.secondRow)}>
                <p className={classNames('body', styles.questType)}>
                  <Lightning className={classNames(styles.lightningIcon)} />
                  Play Streak
                </p>
                <p className={classNames('body', styles.rewardType)}>
                  +200 G7C
                </p>
              </div>
            </div>
          ))}

          {/* Active Quests */}
          <div className={classNames(styles.activeQuests)}>
            <p className={classNames(styles.activeQuestsTitle)}>
              <QuestIconTwo className={classNames(styles.QuestIcoTwo)} /> Active
            </p>
            <Sticker styleType="secondary" variant="filledStrong">
              Label
            </Sticker>
          </div>
          {activeQuests.map((quest) => (
            <div key={quest.id} className={classNames(styles.card)}>
              <div className={classNames(styles.firstRow)}>
                <p className={classNames('title', styles.days)}>0 / 7 days</p>
                <div className={classNames(styles.badges)}>
                  <p className={classNames('body', styles.badgesSpace)}>
                    <Sticker styleType="tertiary" variant="outlined">
                      <Refresh className={classNames(styles.badgeIcon)} />
                      Weekly
                    </Sticker>
                    <Sticker styleType="tertiary" variant="outlined">
                      2x
                    </Sticker>
                  </p>
                  <p className={classNames('body', styles.resetTime)}>
                    Day resets:{' '}
                    <span className={classNames(styles.time)}>
                      23:43:03 (UTC)
                    </span>
                  </p>
                </div>
              </div>
              <div className={classNames(styles.secondRow)}>
                <p className={classNames('body', styles.questType)}>
                  <Lightning className={classNames(styles.lightningIcon)} />
                  Play Streak
                </p>
                <p className={classNames('body', styles.rewardType)}>
                  +200 G7C
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}