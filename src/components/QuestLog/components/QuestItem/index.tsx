import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import { CheckmarkCircleOutline, GiftBox } from '@/assets/images'
import Sticker from '@/components/Sticker'
import { getQuestTypeDisplayName } from '@/utils/getQuestTypeDisplayName'

import { QuestLogInfo, QuestLogTranslations } from '../../types'
import styles from './index.module.scss'

export interface QuestItemProps extends HTMLProps<HTMLDivElement> {
  info: QuestLogInfo
  i18n: QuestLogTranslations
}

export default function QuestItem({
  info,
  i18n,
  className,
  ...props
}: QuestItemProps) {
  const itemClasses: Record<string, boolean> = {}
  itemClasses[styles.active] = info.state === 'ACTIVE'
  itemClasses[styles.readyForClaim] = info.state === 'READY_FOR_CLAIM'
  itemClasses[styles.claimed] = info.state === 'CLAIMED'
  itemClasses[styles.selected] = !!info.selected

  let icon = null
  if (info.state === 'READY_FOR_CLAIM') {
    icon = <GiftBox stroke="var(--color-success-300)" />
  } else if (info.state === 'CLAIMED') {
    icon = <CheckmarkCircleOutline fill="var(--color-neutral-400)" />
  }

  const containerClasses = {
    gradientBorder: !!info.selected
  }
  return (
    <div
      {...props}
      className={classNames(
        className,
        styles.gradientContainer,
        containerClasses
      )}
    >
      <div className={classNames(styles.itemContainer, itemClasses)}>
        <div className={styles.headerContainer}>
          <Sticker styleType="secondary" variant="outlined" className="caption">
            {getQuestTypeDisplayName(info.questType, i18n.type)}
          </Sticker>
          {icon}
        </div>
        <div className={classNames('menu', styles.title)}>{info.title}</div>
      </div>
    </div>
  )
}
