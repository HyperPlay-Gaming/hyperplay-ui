import React, { HTMLProps } from 'react'

import cn from 'classnames'

import { AlertTriangle } from '@/assets/images'

import AlertCard from '../AlertCard/index'
import Button, { ButtonProps } from '../Button'
import DarkContainer from '../DarkContainer'
import Loading from '../Loading'
import Sticker from '../Sticker'
import AssociatedGamesCollapse from './components/AssociatedGamesCollapse'
import Rewards from './components/Rewards'
import StreakProgress from './components/StreakProgress'
import styles from './index.module.scss'
import { QuestDetailsProps } from './types'

function AlertText(props: HTMLProps<HTMLDivElement>) {
  return (
    <div className={styles.alertTextContainer} {...props}>
      <AlertTriangle className={styles.alertTriangle} />
      <div>{props.children}</div>
    </div>
  )
}

export default function QuestDetails({
  title,
  description,
  eligibility,
  rewards,
  rewardsLoading,
  i18n = {
    rewards: 'Claimable Rewards',
    associatedGames: 'Associated games',
    linkSteamAccount: 'Link your Steam account to check eligibility.',
    needMoreAchievements:
      'You need to have completed 15% of the achievements in one of these games.',
    claim: 'Claim all',
    signIn: 'Sign in',
    connectSteamAccount: 'Connect Steam account',
    secondCTAText: 'View Game',
    play: 'Play',
    questType: {
      'REPUTATIONAL-AIRDROP': 'Reputation',
      PLAYSTREAK: 'Play Streak'
    },
    sync: 'Sync',
    claimsLeft: 'Claims left'
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
  collapseIsOpen: opened,
  toggleCollapse: toggle,
  isMinting,
  alertProps,
  errorMessage,
  isSignedIn,
  questType,
  numClaimed,
  numTotal,
  showSync,
  onSyncClick,
  isSyncing,
  chainTooltips,
  ...props
}: QuestDetailsProps) {
  let needMoreAchievementsText = null
  let linkSteamAccountText = null
  let sticker = null
  let eligibilityReqComponent = null
  let buttonText = ''
  let ctaClick = onClaimClick

  // If this is a reputation quest
  if (
    eligibility.reputation !== undefined &&
    questType === 'REPUTATIONAL-AIRDROP'
  ) {
    if (!eligibility.reputation?.eligible) {
      needMoreAchievementsText = (
        <AlertText>{i18n.needMoreAchievements}</AlertText>
      )
    }

    sticker = (
      <Sticker styleType="secondary" variant="outlined">
        {i18n.questType['REPUTATIONAL-AIRDROP']}
      </Sticker>
    )

    eligibilityReqComponent = (
      <AssociatedGamesCollapse
        opened={opened}
        toggle={toggle}
        i18n={{ associatedGames: i18n.associatedGames }}
        games={eligibility.reputation.games}
      />
    )

    const steamAccountIsLinked = !!eligibility.reputation.steamAccountLinked
    if (!isSignedIn) {
      buttonText = i18n.signIn
      ctaClick = onSignInClick
    } else if (!steamAccountIsLinked) {
      buttonText = i18n.connectSteamAccount
      ctaClick = onConnectSteamAccountClick
      linkSteamAccountText = <AlertText>{i18n.linkSteamAccount}</AlertText>
    } else {
      buttonText = i18n.claim
      ctaClick = onClaimClick
    }
    // if this is a play streak quest
  } else if (
    eligibility.playStreak !== undefined &&
    questType === 'PLAYSTREAK'
  ) {
    sticker = (
      <Sticker styleType="secondary" variant="outlined">
        {i18n.questType.PLAYSTREAK}
      </Sticker>
    )

    eligibilityReqComponent = (
      <StreakProgress
        i18n={i18n.streakProgressI18n}
        {...eligibility.playStreak}
      />
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
    errorAlert = <AlertText>{errorMessage}</AlertText>
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

        {eligibilityReqComponent}

        {needMoreAchievementsText}
        {linkSteamAccountText}

        <Rewards
          rewards={rewards}
          i18n={{
            rewards: i18n.rewards,
            claimsLeft: i18n.claimsLeft ?? 'Claims left'
          }}
          loading={rewardsLoading}
          numClaimed={numClaimed}
          numTotal={numTotal}
          chainTooltips={chainTooltips}
        />
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
