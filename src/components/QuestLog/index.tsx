import React from 'react'

import DarkContainer from '../DarkContainer'
import Tabs from '../Tabs'
import QuestItem from './components/QuestItem'
import styles from './index.module.scss'
import { QuestLogProps } from './types'

export default function QuestLog({
  quests,
  i18n = {
    quests: 'Quests',
    claimed: 'Claimed',
    readyForClaim: 'Ready for Claim',
    active: 'Active',
    reputation: 'Reputation'
  }
}: QuestLogProps) {
  const readyForClaimQuests = quests
    .filter((val) => val.state === 'READY_FOR_CLAIM')
    .map((val) => <QuestItem key={val.title} info={val} />)

  const activeQuests = quests
    .filter((val) => val.state === 'ACTIVE')
    .map((val) => <QuestItem key={val.title} info={val} />)

  const claimedQuests = quests
    .filter((val) => val.state === 'CLAIMED')
    .map((val) => <QuestItem key={val.title} info={val} />)

  return (
    <DarkContainer className={styles.darkContainer}>
      <Tabs defaultValue={'tab1'} classNames={{ tabsList: styles.tabsList }}>
        <Tabs.List>
          <Tabs.Tab styleType="secondary" value={'tab1'}>
            <div className="menu">{i18n.quests}</div>
          </Tabs.Tab>
          <Tabs.Tab styleType="secondary" value={'tab2'}>
            <div className="menu">{i18n.claimed}</div>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={'tab1'}>
          <div>
            <div className={styles.sectionTitle}>{i18n.readyForClaim}</div>
            <div className={styles.questItemsContainer}>
              {readyForClaimQuests}
            </div>
            <div className={styles.sectionTitle}>{i18n.active}</div>
            <div className={styles.questItemsContainer}>{activeQuests}</div>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value={'tab2'}>
          <div>
            <div className={styles.sectionTitle}>{i18n.claimed}</div>
            <div className={styles.questItemsContainer}>{claimedQuests}</div>
          </div>
        </Tabs.Panel>
      </Tabs>
    </DarkContainer>
  )
}
