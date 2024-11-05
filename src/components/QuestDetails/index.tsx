import React from 'react'

import cn from 'classnames'

import Alert from '../Alert'
import AlertCard from '../AlertCard/index'
import Button, { ButtonProps } from '../Button'
import DarkContainer from '../DarkContainer'
import Loading from '../Loading'
import Sticker from '../Sticker'
import styles from './index.module.scss'
import { QuestDetailsProps } from './types'

export default function QuestDetails({
  title,
  description,
  eligibilityComponent,
  i18n = {
    rewards: 'Claimable Rewards',
    claim: 'Claim all',
    signIn: 'Sign in',
    secondCTAText: 'View Game',
    play: 'Play',
    questType: {
      'REPUTATIONAL-AIRDROP': 'Reputation',
      PLAYSTREAK: 'Play Streak'
    },
    sync: 'Sync',
    claimsLeft: 'Claims left',
    viewReward: 'View Reward',
    claimed: 'Claimed',
    connectSteamAccount: 'Connect Steam account'
  },
  onClaimClick,
  onSignInClick,
  onConnectSteamAccountClick,
  onPlayClick,
  onSecondCTAClick,
  isQuestsPage,
  showSecondCTA,
  ctaComponent,
  loading,
  classNames,
  ctaDisabled,
  isMinting,
  alertProps,
  errorMessage,
  isSignedIn,
  questType,
  showSync,
  onSyncClick,
  isSyncing,
  steamAccountIsLinked,
  rewardsComponent,
  ...props
}: QuestDetailsProps) {
  let sticker = null
  let buttonText = ''
  let ctaClick = onClaimClick

  // If this is a reputation quest
  if (questType === 'REPUTATIONAL-AIRDROP') {
    if (questType === 'REPUTATIONAL-AIRDROP') {
      sticker = (
        <Sticker styleType="secondary" variant="outlined">
          {i18n.questType['REPUTATIONAL-AIRDROP']}
        </Sticker>
      )
    }

    if (questType === 'REPUTATIONAL-AIRDROP') {
      if (!isSignedIn) {
        buttonText = i18n.signIn
        ctaClick = onSignInClick
      } else if (!steamAccountIsLinked) {
        buttonText = i18n.connectSteamAccount
        ctaClick = onConnectSteamAccountClick
      } else {
        buttonText = i18n.claim
        ctaClick = onClaimClick
      }
    }
    // if this is a play streak quest
  } else if (questType === 'PLAYSTREAK') {
    sticker = (
      <Sticker styleType="secondary" variant="outlined">
        {i18n.questType.PLAYSTREAK}
      </Sticker>
    )

    if (!isSignedIn) {
      buttonText = i18n.signIn
      ctaClick = onSignInClick
    } else {
      buttonText = i18n.claim
      ctaClick = onClaimClick
    }
  }

  if (isQuestsPage) {
    buttonText = i18n.play ?? 'Play'
    ctaClick =
      onPlayClick === undefined
        ? () => console.log('play click handler not set!')
        : onPlayClick
  }

  let primaryCTAButtonType: ButtonProps['type'] = 'secondary'
  if (showSync && onSyncClick) {
    buttonText = i18n.sync ?? 'Sync'
    ctaClick = onSyncClick
    primaryCTAButtonType = 'tertiary'
  }

  let buttonContents = <>{buttonText}</>
  if (isMinting || (showSync && isSyncing)) {
    buttonContents = (
      <Loading className={cn(styles.loader, classNames?.loading)} />
    )
  }

  let errorAlert = null
  if (errorMessage) {
    errorAlert = <Alert message={errorMessage} />
  } else if (alertProps) {
    errorAlert = <AlertCard {...alertProps} />
  }

  let secondCTA = null
  if (showSecondCTA) {
    secondCTA = (
      <Button
        type="tertiary"
        className={styles.claimButton}
        onClick={onSecondCTAClick}
      >
        {i18n.secondCTAText}
      </Button>
    )
  }

  let content = (
    <div className={cn(styles.rootContent, classNames?.rootContent)}>
      <div className={cn(styles.container, classNames?.content)}>
        {sticker}
        <div className={cn('title', styles.title)}>{title}</div>
        <div className={cn('body-sm', 'color-neutral-400', styles.description)}>
          {description}
        </div>

        {eligibilityComponent}
        {rewardsComponent}
        {errorAlert}
      </div>
      <div className={styles.ctaContainer}>
        {ctaComponent ?? (
          <>
            {secondCTA}
            <Button
              type={primaryCTAButtonType}
              className={styles.claimButton}
              onClick={ctaClick}
              disabled={ctaDisabled || isMinting}
            >
              {buttonContents}
            </Button>
          </>
        )}
      </div>
    </div>
  )
  if (loading) {
    content = <Loading className={cn(styles.loader, classNames?.loading)} />
  }

  return (
    <DarkContainer
      className={cn(styles.darkContainer, classNames?.root)}
      {...props}
    >
      {content}
    </DarkContainer>
  )
}
