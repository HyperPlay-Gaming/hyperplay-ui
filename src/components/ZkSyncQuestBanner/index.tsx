import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import CapsuleUrl from '@/assets/banners/ZkSync/Capsule.png?url'

import Button from '../Button'
import styles from './index.module.scss'

export interface ZkSyncQuestBannerProps extends HTMLProps<HTMLDivElement> {
  i18n?: {
    title?: string
    description?: JSX.Element
    buttonText?: string
  }
  link: string
}

export default function ZkSyncQuestBanner({
  i18n,
  link,
  ...props
}: ZkSyncQuestBannerProps) {
  const { title, description, buttonText } = i18n || {
    title: 'NEW QUEST AVAILABLE',
    description: (
      <div className={classNames('title', styles.title)}>
        Existing capsule holders, complete the quest to
        <b> earn special zkSync on-chain rewards!</b>
      </div>
    ),
    buttonText: 'View Quest'
  }
  return (
    <div className={styles.bannerContainer} {...props}>
      <div className={styles.contentContainer}>
        <h3>{title}</h3>
        {description}
        <div className={styles.cta}>
          <a href={link} rel="noreferrer" target="_blank">
            <Button type="secondary">
              <div className={styles.buttonTextContainer}>{buttonText}</div>
            </Button>
          </a>
        </div>
      </div>
      <img src={CapsuleUrl} className={styles.capsule} />
    </div>
  )
}
