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

export interface QuestRewards {
  ERC721Rewards: ERC721QuestReward[]
  ERC1155Rewards: ERC1155QuestReward[]
  ERC20QuestRewards: ERC20QuestReward[]
}

// More quest eligibilty interfaces will be added here in future iterations
export type Eligibility = ReputationQuestEligibility

export interface QuestDetailsProps extends HTMLProps<HTMLDivElement> {
  title: string
  description: string
  eligibility: Eligibility
  rewards: QuestReward[]
  onClaimClick: () => void
  i18n?: {
    reward: string
    associatedGames: string
    linkSteamAccount: string
    needMoreAchievements: string
    claim: string
  }
}