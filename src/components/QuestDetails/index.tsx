import React from 'react'

import { useDisclosure } from '@mantine/hooks'
import classNames from 'classnames'

import Button from '../Button'
import DarkContainer from '../DarkContainer'
import AssociatedGamesCollapse from './components/AssociatedGamesCollapse'
import styles from './index.module.scss'
import { QuestDetailsProps } from './types'

export default function QuestDetails({
  className,
  title,
  description,
  eligibility,
  rewards,
  i18n = {
    reward: 'Reward',
    associatedGames: 'Associated games',
    linkSteamAccount: 'Link your Steam account to check eligibility.',
    needMoreAchievements:
      'You need to have completed 15% of the achievements in one of these games.',
    claim: 'Claim'
  },
  onClaimClick,
  ...props
}: QuestDetailsProps) {
  const [opened, { toggle }] = useDisclosure(false)

  let needMoreAchievementsText = null
  if (!eligibility.eligible) {
    needMoreAchievementsText = <div>{i18n.needMoreAchievements}</div>
  }

  let linkSteamAccountText = null
  if (!eligibility.steamAccountLinked) {
    linkSteamAccountText = <div>{i18n.linkSteamAccount}</div>
  }

  const rewardComponents = rewards.map((reward) => (
    <div key={reward.title}>{reward.title}</div>
  ))

  return (
    <DarkContainer className={styles.darkContainer}>
      <div className={classNames(className, styles.container)} {...props}>
        <div className="title">{title}</div>
        <div className="body-sm color-neutral-400">{description}</div>

        <AssociatedGamesCollapse
          opened={opened}
          toggle={toggle}
          i18n={{ associatedGames: i18n.associatedGames }}
          eligibility={eligibility}
        />

        <div className="eyebrow color-neutral-400">{i18n.reward}</div>
        {rewardComponents}
        {needMoreAchievementsText}
        {linkSteamAccountText}
        <Button
          type="secondary"
          className={styles.claimButton}
          onClick={onClaimClick}
        >
          {i18n.claim}
        </Button>
      </div>
    </DarkContainer>
  )
}
