import { HTMLProps } from 'react'

import { QuestTypeTranslations } from '@/common/types'

import { StreakProgressI18n } from './components/StreakProgress'

export interface Game {
  title: string
  imageUrl: string
  loading?: boolean
}

export interface ReputationQuestEligibility {
  games: Game[]
  completionPercent: number
  eligible: boolean
  steamAccountLinked: boolean
}

export interface PlayStreakEligibility {
  currentStreakInDays: number
  requiredStreakInDays: number
  resetTimeInMsSinceEpoch: number
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
    playStreak?: PlayStreakEligibility
  }
  rewards: QuestReward[]
  numClaimed?: number
  numTotal?: number
  onClaimClick: () => void
  onSignInClick: () => void
  onConnectSteamAccountClick: () => void
  isQuestsPage?: boolean
  onPlayClick?: () => void
  onSecondCTAClick?: () => void
  i18n?: {
    rewards: string
    associatedGames: string
    linkSteamAccount: string
    needMoreAchievements: string
    claim: string
    signIn: string
    connectSteamAccount: string
    questType: QuestTypeTranslations
    streakProgressI18n?: StreakProgressI18n
    secondCTAText?: string
    play?: string
  }
  rewardsLoading?: boolean
  loading?: boolean
  classNames?: {
    root?: string
    rootContent?: string
    content?: string
    loading?: string
  }
  ctaDisabled?: boolean
  collapseIsOpen: boolean
  toggleCollapse: () => void
  isMinting?: boolean
  errorMessage?: string
  isSignedIn: boolean
  questType: 'PLAYSTREAK' | 'REPUTATIONAL-AIRDROP'
}
