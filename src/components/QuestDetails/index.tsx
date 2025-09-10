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
import dayjs from 'dayjs'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import { IconClock, IconSquareChevronLeftFilled } from '@tabler/icons-react'
dayjs.extend(localizedFormat)

export default function QuestDetails({
  title,
  description,
  endDate,
  eligibilityComponent,
  i18n = {
    endsOn: 'Quest ends',
    endedOn: 'Quest ended',
    rewards: 'Claimable Rewards',
    claim: 'Claim',
    signIn: 'Sign in',
    secondCTAText: 'View Game',
    play: 'Play',
    questType: {
      'REPUTATIONAL-AIRDROP': 'Reputation',
      PLAYSTREAK: 'Play Streak',
      LEADERBOARD: 'Leaderboard'
    },
    sync: 'Sync',
    claimsLeft: 'Claims left',
    viewReward: 'View Reward',
    claimed: 'Claimed',
    connectSteamAccount: 'Connect Steam account'
  },
  onSignInClick,
  onConnectSteamAccountClick,
  onBackClick,
  onPlayClick,
  onSecondCTAClick,
  isQuestsPage,
  showSecondCTA,
  ctaComponent,
  loading,
  classNames,
  ctaDisabled,
  alertProps,
  errorMessage,
  isSignedIn,
  questType,
  showSync,
  onSyncClick,
  isSyncing,
  steamAccountIsLinked,
  rewardsComponent,
  gameTitle,
  ...props
}: QuestDetailsProps) {
  let sticker = null
  let buttonText = ''
  let ctaClick = null

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
    }
  }

  if (isQuestsPage) {
    buttonText = i18n.play ?? 'Play'
    ctaClick =
      onPlayClick === undefined
        ? () => console.log('play click handler not set!')
        : onPlayClick
  }

  // Game Title Badge
  const gameNameSticker = gameTitle ? (
    <Sticker styleType="neutral" variant="outlined">
      {gameTitle}
    </Sticker>
  ) : null

  // Back Button
  const backButton = onBackClick ? (
    <div
      className={styles.backButton}
      onClick={onBackClick}
      role="button"
      tabIndex={0}
      aria-label="Go back"
    >
      <IconSquareChevronLeftFilled size={32} />
    </div>
  ) : null

  let primaryCTAButtonType: ButtonProps['type'] = 'secondary'
  if (showSync && onSyncClick) {
    buttonText = i18n.sync ?? 'Sync'
    ctaClick = onSyncClick
    primaryCTAButtonType = 'tertiary'
  }

  let buttonContents = <>{buttonText}</>
  if (showSync && isSyncing) {
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

  const isEndDateInFuture = endDate && new Date(endDate) > new Date()
  const utcFormattedDate = dayjs(endDate).format('lll')

  let content = (
    <div className={cn(styles.rootContent, classNames?.rootContent)}>
      <div className={styles.badges}>
        {backButton}
        <div className={cn(classNames?.content)}>{gameNameSticker}</div>
        <div className={cn(classNames?.content)}>{sticker}</div>
      </div>
      <div className={cn('title', styles.title)}>{title}</div>
      <div className={cn('body-sm', 'color-neutral-400', styles.description)}>
        {description}
      </div>
      {endDate && (
        <div className={cn('body-sm', 'color-neutral-400', styles.description)}>
          <span className={styles.endDate}>
            <IconClock
              className={isEndDateInFuture ? styles.iconFuture : undefined}
            />
            <span
              className={
                isEndDateInFuture ? styles.futureDate : styles.pastDate
              }
            >
              {isEndDateInFuture ? i18n.endsOn : i18n.endedOn}:
            </span>
            {utcFormattedDate}
          </span>
        </div>
      )}
      {eligibilityComponent}
      {rewardsComponent}
      {errorAlert}
      <div
        className={cn(styles.ctaContainer, {
          [styles.isQuestsPage]: isQuestsPage
        })}
      >
        {ctaComponent ?? (
          <>
            {secondCTA}
            {ctaClick !== null && (
              <Button
                type={primaryCTAButtonType}
                className={styles.claimButton}
                onClick={ctaClick}
                disabled={ctaDisabled}
              >
                {buttonContents}
              </Button>
            )}
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
