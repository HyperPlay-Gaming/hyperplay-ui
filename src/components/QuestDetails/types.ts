import { HTMLProps } from 'react'

import { QuestTypeTranslations } from '@/common/types'

export interface Game {
  title: string
  imageUrl: string
  minted: boolean
  mintableAchievementsCount: number
  mintedAchievementsCount: number
  totalAchievementsCount: number
  onMintClick: () => void
  onRefreshClick: () => void
  onSyncClick: () => void
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

export interface Eligbility {
  reputation?: ReputationQuestEligibility
}

export interface QuestDetailsI18n {
  reward: string
  eligibleGames: string
  linkSteamAccount: string
  claim: string
  questType: QuestTypeTranslations
  mint: string
  sync: string
  refresh: string
  achievements: string
  minted: string
  completed: string
  questRequiresCompletion: string
}

export interface QuestDetailsProps extends HTMLProps<HTMLDivElement> {
  title: string
  description: string
  // More quest eligibilty interfaces will be added here in future iterations
  eligibility: Eligbility
  rewards: QuestReward[]
  onClaimClick: () => void
  i18n?: QuestDetailsI18n
}
