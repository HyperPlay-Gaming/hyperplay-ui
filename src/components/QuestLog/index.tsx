import React from 'react'

import classNames from 'classnames'

import DarkContainer from '../DarkContainer'
import Loading from '../Loading'
import { Tabs, getTabsClassNames } from '../Tabs'
import QuestItem from './components/QuestItem'
import styles from './index.module.scss'
import { QuestLogProps } from './types'

export default function QuestLog({
  quests,
  loading,
  i18n = {
    quests: 'Quests',
    claimed: 'Claimed',
    readyForClaim: 'Ready for Claim',
    active: 'Active',
    type: {
      REPUTATION: 'Reputation',
      PLAYSTREAK: 'Play Streak'
    }
  },
  className,
  ...props
}: QuestLogProps) {
  const activeQuests = quests
    .filter((val) => val.state === 'ACTIVE')
    .map((val) => (
      <QuestItem key={val.id} info={val} i18n={i18n} onClick={val.onClick} />
    ))

  const claimedQuests = quests
    .filter((val) => val.state === 'CLAIMED')
    .map((val) => (
      <QuestItem key={val.id} info={val} i18n={i18n} onClick={val.onClick} />
    ))

  const readyForClaimQuests = quests
    .filter((val) => val.state === 'READY_FOR_CLAIM')
    .map((val) => (
      <QuestItem key={val.id} info={val} i18n={i18n} onClick={val.onClick} />
    ))

  const numClaimable = readyForClaimQuests.length
  let claimableQuestsCounter = null
  if (numClaimable > 0)
    claimableQuestsCounter = (
      <div className={classNames('menu', styles.counter)}>{numClaimable}</div>
    )

  let tab1Content = null
  if (loading) {
    tab1Content = <Loading className={styles.loader} />
  } else {
    tab1Content = (
      <div>
        <div className={styles.sectionTitle}>{i18n.readyForClaim}</div>
        <div className={styles.questItemsContainer}>{readyForClaimQuests}</div>
        <div className={styles.sectionTitle}>{i18n.active}</div>
        <div className={styles.questItemsContainer}>{activeQuests}</div>
      </div>
    )
  }

  let tab2Content = null
  if (loading) {
    tab2Content = <Loading className={styles.loader} />
  } else {
    tab2Content = (
      <div>
        <div className={styles.sectionTitle}>{i18n.claimed}</div>
        <div className={styles.questItemsContainer}>{claimedQuests}</div>
      </div>
    )
  }

  return (
    <DarkContainer
      className={classNames(styles.darkContainer, className)}
      {...props}
    >
      <Tabs
        defaultValue={'tab1'}
        classNames={getTabsClassNames(
          { list: styles.tabsList },
          { tab: 'secondary' }
        )}
      >
        <Tabs.List>
          <Tabs.Tab value={'tab1'}>
            <div className="menu">
              {i18n.quests}
              {claimableQuestsCounter}
            </div>
          </Tabs.Tab>
          <Tabs.Tab value={'tab2'}>
            <div className="menu">{i18n.claimed}</div>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={'tab1'}>{tab1Content}</Tabs.Panel>
        <Tabs.Panel value={'tab2'}>{tab2Content}</Tabs.Panel>
      </Tabs>
    </DarkContainer>
  )
}
