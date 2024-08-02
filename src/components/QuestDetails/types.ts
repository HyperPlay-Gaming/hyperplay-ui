import { HTMLProps } from 'react'

import { QuestTypeTranslations } from '@/common/types'

import { InfoAlertProps } from '../AlertCard'
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
  minimumSessionTimeInSeconds: number
  accumulatedPlaytimeTodayInSeconds: number
  lastPlaySessionCompletedDateTimeUTC: string
  dateTimeCurrentSessionStartedInMsSinceEpoch?: number
}

export interface QuestReward {
  title: string
  imageUrl: string
  numOfClaimsLeft?: string
  // this will likely be a BigNumber so we will convert to float before passing as param
  numToClaim?: string
  chainName: string
}

export interface QuestDetailsTranslations {
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
  sync?: string
  claimsLeft?: string
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
  showSecondCTA?: boolean
  ctaComponent?: React.ReactNode
  isQuestsPage?: boolean
  onPlayClick?: () => void
  onSecondCTAClick?: () => void
  showSync?: boolean
  onSyncClick?: () => void
  isSyncing?: boolean
  i18n?: QuestDetailsTranslations
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
  alertProps?: InfoAlertProps
  errorMessage?: string
  isSignedIn: boolean
  questType: 'PLAYSTREAK' | 'REPUTATIONAL-AIRDROP'
  chainTooltips?: Record<string, string>
}
