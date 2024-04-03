import { HTMLProps } from 'react'

import { QuestType, QuestTypeTranslations } from '@/common/types'

export interface QuestLogInfo {
  questType: QuestType
  title: string
  state: 'READY_FOR_CLAIM' | 'ACTIVE' | 'CLAIMED'
  onClick?: () => void
  selected?: boolean
  id: number
}

export interface QuestLogTranslations {
  quests: string
  claimed: string
  readyForClaim: string
  active: string
  type: QuestTypeTranslations
}

export interface QuestLogProps extends HTMLProps<HTMLDivElement> {
  quests: QuestLogInfo[]
  i18n?: QuestLogTranslations
  loading?: boolean
}
