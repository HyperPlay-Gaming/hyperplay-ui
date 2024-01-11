import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import { CheckmarkCircleOutline, GiftBox } from '@/assets/images'

import { QuestLogInfo } from '../../types'
import styles from './index.module.scss'

export interface QuestItemProps extends HTMLProps<HTMLDivElement> {
  info: QuestLogInfo
}

export default function QuestItem({
  info,
  className,
  ...props
}: QuestItemProps) {
  const itemClasses: Record<string, boolean> = {}
  itemClasses[styles.active] = info.state === 'ACTIVE'
  itemClasses[styles.readyForClaim] = info.state === 'READY_FOR_CLAIM'

  let icon = null
  if (info.state === 'READY_FOR_CLAIM') {
    icon = <GiftBox stroke="var(--color-success-300)" />
  } else if (info.state === 'CLAIMED') {
    icon = <CheckmarkCircleOutline fill="var(--color-neutral-300)" />
  }
  return (
    <div
      {...props}
      className={classNames(className, {
        gradientBorder: info.state === 'READY_FOR_CLAIM'
      })}
    >
      <div className={classNames(styles.itemContainer, itemClasses)}>
        <div className={styles.headerContainer}>
          <div>{info.questType}</div>
          {icon}
        </div>
        <div className="menu">{info.title}</div>
      </div>
    </div>
  )
}
