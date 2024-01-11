import { HTMLProps } from 'react'

export interface QuestLogInfo {
  questType: 'REPUTATION'
  title: string
  state: 'READY_FOR_CLAIM' | 'ACTIVE' | 'CLAIMED'
}

export interface QuestLogProps extends HTMLProps<HTMLDivElement> {
  quests: QuestLogInfo[]
  i18n?: {
    quests: string
    claimed: string
    readyForClaim: string
    active: string
    reputation: string
  }
}
