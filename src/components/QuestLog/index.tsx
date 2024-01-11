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
      <Tabs defaultValue={'tab1'}>
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
            <div>{i18n.readyForClaim}</div>
            {readyForClaimQuests}
            <div>{i18n.active}</div>
            {activeQuests}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value={'tab2'}>
          <div>
            <div>{i18n.claimed}</div>
            {claimedQuests}
          </div>
        </Tabs.Panel>
      </Tabs>
    </DarkContainer>
  )
}