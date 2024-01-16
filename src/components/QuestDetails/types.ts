import { QuestTypeTranslations } from '@/common/types'
import { HTMLProps } from 'react'

export interface Game {
  title: string
  imageUrl: string
}

export interface ReputationQuestEligibility {
  games: Game[]
  completionPercent: number
  eligible: boolean
  steamAccountLinked: boolean
}

export interface QuestReward {
  title: string
  imageUrl: string
} 

export interface QuestDetailsProps extends HTMLProps<HTMLDivElement> {
  title: string
  description: string
  // More quest eligibilty interfaces will be added here in future iterations
  eligibility: {
    reputation?: ReputationQuestEligibility
  }
  rewards: QuestReward[]
  onClaimClick: () => void
  i18n?: {
    reward: string
    associatedGames: string
    linkSteamAccount: string
    needMoreAchievements: string
    claim: string
    questType: QuestTypeTranslations
  }
}
