import { HTMLProps } from 'react'

export type QuestType = 'REPUTATION'

export interface QuestLogInfo {
  questType: QuestType
  title: string
  state: 'READY_FOR_CLAIM' | 'ACTIVE' | 'CLAIMED'
  onClick?: () => void
  selected?: boolean
}

export interface QuestLogTranslations {
  quests: string
  claimed: string
  readyForClaim: string
  active: string
  reputation: string
}

export interface QuestLogProps extends HTMLProps<HTMLDivElement> {
  quests: QuestLogInfo[]
  i18n?: QuestLogTranslations
}
