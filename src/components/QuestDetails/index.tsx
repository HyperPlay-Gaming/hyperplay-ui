import React, { HTMLProps } from 'react'

import { useDisclosure } from '@mantine/hooks'
import classNames from 'classnames'

import Button from '../Button'
import DarkContainer from '../DarkContainer'
import AssociatedGamesCollapse from './components/AssociatedGamesCollapse'
import Rewards from './components/Rewards'
import styles from './index.module.scss'
import { QuestDetailsProps } from './types'
import { AlertTriangle } from '@/assets/images'

function AlertText(props: HTMLProps<HTMLDivElement>){
  return <div className={styles.alertTextContainer} {...props}><AlertTriangle className={styles.alertTriangle} /><div>{props.children}</div></div>
}

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
    claim: 'Claim all'
  },
  onClaimClick,
  ...props
}: QuestDetailsProps) {
  const [opened, { toggle }] = useDisclosure(false)

  let needMoreAchievementsText = null
  if (!eligibility.eligible) {
    needMoreAchievementsText = <AlertText>{i18n.needMoreAchievements}</AlertText>
  }

  let linkSteamAccountText = null
  if (!eligibility.steamAccountLinked) {
    linkSteamAccountText = <AlertText>{i18n.linkSteamAccount}</AlertText>
  }

  return (
    <DarkContainer className={styles.darkContainer}>
      <div className={classNames(className, styles.container)} {...props}>
        <div className="title">{title}</div>
        <div
          className={classNames(
            'body-sm',
            'color-neutral-400',
            styles.description
          )}
        >
          {description}
        </div>

        <AssociatedGamesCollapse
          opened={opened}
          toggle={toggle}
          i18n={{ associatedGames: i18n.associatedGames }}
          eligibility={eligibility}
        />

        {needMoreAchievementsText}
        {linkSteamAccountText}

        <Rewards rewards={rewards} i18n={{ reward: i18n.reward }} />
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
