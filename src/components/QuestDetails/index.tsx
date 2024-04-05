import React, { HTMLProps } from 'react'

import { useDisclosure } from '@mantine/hooks'
import cn from 'classnames'

import { AlertTriangle } from '@/assets/images'
import { getQuestTypeDisplayName } from '@/utils/getQuestTypeDisplayName'

import Button from '../Button'
import DarkContainer from '../DarkContainer'
import Loading from '../Loading'
import Sticker from '../Sticker'
import AssociatedGamesCollapse from './components/AssociatedGamesCollapse'
import Rewards from './components/Rewards'
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
    reward: 'Reward',
    associatedGames: 'Associated games',
    linkSteamAccount: 'Link your Steam account to check eligibility.',
    needMoreAchievements:
      'You need to have completed 15% of the achievements in one of these games.',
    claim: 'Claim all',
    questType: {
      REPUTATION: 'Reputation'
    }
  },
  onClaimClick,
  loading,
  classNames,
  ctaDisabled,
  ...props
}: QuestDetailsProps) {
  const [opened, { toggle }] = useDisclosure(false)

  let needMoreAchievementsText = null
  let linkSteamAccountText = null
  let sticker = null
  let gamesCollapsable = null
  if (eligibility.reputation !== undefined) {
    if (!eligibility.reputation?.eligible) {
      needMoreAchievementsText = (
        <AlertText>{i18n.needMoreAchievements}</AlertText>
      )
    }

    if (!eligibility.reputation.steamAccountLinked) {
      linkSteamAccountText = <AlertText>{i18n.linkSteamAccount}</AlertText>
    }

    sticker = (
      <Sticker styleType="secondary" variant="outlined">
        {getQuestTypeDisplayName('REPUTATION', i18n.questType)}
      </Sticker>
    )

    gamesCollapsable = (
      <AssociatedGamesCollapse
        opened={opened}
        toggle={toggle}
        i18n={{ associatedGames: i18n.associatedGames }}
        games={eligibility.reputation.games}
      />
    )
  }

  let content = (
    <div className={cn(styles.container, classNames?.content)}>
      {sticker}
      <div className={cn('title', styles.title)}>{title}</div>
      <div className={cn('body-sm', 'color-neutral-400', styles.description)}>
        {description}
      </div>

      {gamesCollapsable}

      {needMoreAchievementsText}
      {linkSteamAccountText}

      <Rewards
        rewards={rewards}
        i18n={{ reward: i18n.reward }}
        loading={rewardsLoading}
      />
      <Button
        type="secondary"
        className={styles.claimButton}
        onClick={onClaimClick}
        disabled={ctaDisabled}
      >
        {i18n.claim}
      </Button>
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
