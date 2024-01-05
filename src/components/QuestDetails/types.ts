import { HTMLProps } from 'react'

export interface ReputationQuestEligibility {
  games: string[]
  completionPercent: number
  eligible: boolean
  steamAccountLinked: boolean
}

export interface GenericQuestReward {
  title: string
  imageUrl: string
}

export interface ERC721QuestReward extends GenericQuestReward {
  tokenId: number
}

export interface ERC1155QuestReward extends GenericQuestReward {
  tokenId: number
  amount: number
}

export interface ERC20QuestReward extends GenericQuestReward {
  amount: number
}

export type QuestReward =
  | ERC721QuestReward
  | ERC1155QuestReward
  | ERC20QuestReward

export interface QuestDetailsProps extends HTMLProps<HTMLDivElement> {
  title: string
  description: string
  eligibility: ReputationQuestEligibility
  rewards: QuestReward[]
  i18n?: {
    reward: string
    associatedGames: string
    linkSteamAccount: string
    needMoreAchievements: string
    claim: string
  }
}
