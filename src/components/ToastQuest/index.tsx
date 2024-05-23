import React from 'react'

import { QuestScrollIcon } from '@/assets/images'

import { ToastGeneric } from '../ToastGeneric'

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
    questComplete: 'Quest complete!'
  }
}: ToastQuestProps) {
  let title = ''
  let subtext = ''
  let image = null
  if (status === 'available') {
    title = i18n.questAvailable
    subtext = i18n.toSeeDetails
    image = <QuestScrollIcon fill="#FFFFFF" />
  } else if (status === 'completed') {
    title = i18n.questComplete
    subtext = i18n.toClaimReward
    image = <QuestScrollIcon fill="#FFFFFF" />
  }
  return (
    <ToastGeneric
      title={title}
      subtext={subtext}
      onClick={onCloseClick}
      image={image}
    />
  )
}
