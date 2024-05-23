import React, { ReactElement } from 'react'

import classNames from 'classnames'

import { QuestScrollIcon } from '@/assets/images'

import { ToastGeneric } from '../ToastGeneric'
import styles from './ToastQuest.module.scss'

export interface ToastQuestProps {
  status: 'available' | 'completed'
  onCloseClick: () => void
  i18n?: {
    overlayToggleModKey: string
    overlayToggleKey: string
    toSeeDetails: string
    toClaimReward: string
    questAvailable: string
    questComplete: string
    plus: string
  }
}

export function ToastQuest({
  status,
  onCloseClick,
  i18n = {
    overlayToggleKey: 'X',
    overlayToggleModKey: 'Alt',
    toSeeDetails: 'to see details.',
    toClaimReward: 'to claim your reward.',
    questAvailable: 'Quest available!',
    questComplete: 'Quest complete!',
    plus: '+'
  }
}: ToastQuestProps) {
  let title = ''
  let subtext: string | ReactElement = ''
  const image = <QuestScrollIcon />
  let imageClass = ''
  const toggleTextComponent = (
    <>
      <div className={classNames('menu', styles.emphasisText)}>
        {i18n.overlayToggleModKey}
      </div>
      {i18n.plus}
      <div className={classNames('menu', styles.emphasisText)}>
        {i18n.overlayToggleKey}
      </div>
    </>
  )
  if (status === 'available') {
    title = i18n.questAvailable
    subtext = (
      <div className={styles.subtextRow}>
        {toggleTextComponent} {i18n.toSeeDetails}
      </div>
    )
    imageClass = styles.questIconContainer
  } else if (status === 'completed') {
    title = i18n.questComplete
    subtext = (
      <div className={styles.subtextRow}>
        {toggleTextComponent} {i18n.toClaimReward}
      </div>
    )
    imageClass = classNames(styles.questIconContainer, styles.completed)
  }
  return (
    <ToastGeneric
      title={title}
      subtext={subtext}
      onClick={onCloseClick}
      image={image}
      classNames={{ image: imageClass }}
    />
  )
}
