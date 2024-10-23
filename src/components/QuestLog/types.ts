import { HTMLProps } from 'react'

import { QuestType, QuestTypeTranslations } from '@/common/types'

import {
  PointsBalanceProps,
  PointsBalanceTranslations
} from '../PointsBalance/types'

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
  pointsBalance?: PointsBalanceTranslations
  pointsClaimed: string
}

export interface QuestLogProps extends HTMLProps<HTMLDivElement> {
  quests: QuestLogInfo[]
  questElements?: {
    active: React.ReactElement[]
    readyToClaim: React.ReactElement[]
    claimed: React.ReactElement[]
  }
  i18n?: QuestLogTranslations
  loading?: boolean
  pointsProps?: PointsBalanceProps[]
}
