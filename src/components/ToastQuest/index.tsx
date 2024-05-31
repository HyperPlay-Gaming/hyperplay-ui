import React, { ReactElement } from 'react'

import classNames from 'classnames'

import { Diamond, QuestScrollIcon } from '@/assets/images'

import { ToastGeneric } from '../ToastGeneric'
import styles from './ToastQuest.module.scss'

export interface ToastQuestProps {
  status: 'available' | 'completed' | 'claimed'
  onCloseClick: () => void
  i18n?: {
    overlayToggleModKey: string
    overlayToggleKey: string
    toSeeDetails: string
    toClaimReward: string
    questAvailable: string
    questComplete: string
    plus: string
    rewardClaimed: string
    youHaveClaimed: string
  }
}

export function ToastQuest({
  status,
  onCloseClick,
  i18n = {
    overlayToggleKey: 'X',
    overlayToggleModKey: 'option',
    toSeeDetails: 'to see details.',
    toClaimReward: 'to claim your reward.',
    questAvailable: 'Quest available!',
    questComplete: 'Quest complete!',
    plus: '+',
    rewardClaimed: 'Claim successful',
    youHaveClaimed: 'You have claimed {{numberClaimed}} rewards.'
  }
}: ToastQuestProps) {
  let title = ''
  let subtext: string | ReactElement = ''
  let image = <QuestScrollIcon />
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

  function SubtextWithToggle({ subtextText }: { subtextText: JSX.Element }) {
    return (
      <div className={classNames('caption', styles.subtextRow)}>
        {subtextText}
      </div>
    )
  }

  if (status === 'available') {
    title = i18n.questAvailable
    const subtextComponent = (
      <>
        {toggleTextComponent} {i18n.toSeeDetails}
      </>
    )
    subtext = <SubtextWithToggle subtextText={subtextComponent} />
    imageClass = styles.questIconContainer
  } else if (status === 'completed') {
    title = i18n.questComplete
    const subtextComponent = (
      <>
        {toggleTextComponent} {i18n.toClaimReward}
      </>
    )
    subtext = <SubtextWithToggle subtextText={subtextComponent} />
    imageClass = classNames(styles.questIconContainer, styles.completed)
  } else if (status === 'claimed') {
    title = i18n.rewardClaimed
    const subtextComponent = <>{i18n.youHaveClaimed}</>
    subtext = <SubtextWithToggle subtextText={subtextComponent} />
    imageClass = classNames(styles.questIconContainer, styles.completed)
    image = <Diamond />
  }

  return (
    <ToastGeneric
      title={title}
      subtext={subtext}
      onClick={onCloseClick}
      image={image}
      classNames={{ image: imageClass, root: styles.root }}
      showCloseButton={true}
    />
  )
}
