import { HTMLProps, ReactNode } from 'react'
import { Options as MarkdownOptions } from 'react-markdown'

import { QuestTypeTranslations } from '@/common/types'

import { InfoAlertProps } from '../AlertCard'
import { StreakProgressI18n } from '../StreakProgress'

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
  rightSection?: React.ReactNode
}

export interface QuestReward {
  title: string
  imageUrl: string
  numOfClaimsLeft?: string
  // this will likely be a BigNumber so we will convert to float before passing as param
  numToClaim?: string
  chainName: string
  isClaimed?: boolean
  marketplaceUrl?: string
}

export interface QuestDetailsTranslations {
  rewards: string
  claim: string
  signIn: string
  questType: QuestTypeTranslations
  streakProgressI18n?: StreakProgressI18n
  secondCTAText?: string
  play?: string
  sync?: string
  claimsLeft?: string
  viewReward?: string
  claimed?: string
  connectSteamAccount: string
}

export interface QuestDetailsProps extends HTMLProps<HTMLDivElement> {
  title: string
  description: React.ReactNode | string
  eligibilityComponents: ReactNode
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
  isMinting?: boolean
  alertProps?: InfoAlertProps
  errorMessage?: string
  isSignedIn: boolean
  questType: 'PLAYSTREAK' | 'REPUTATIONAL-AIRDROP'
  chainTooltips?: Record<string, string>
  markdownOptions?: MarkdownOptions
  steamAccountIsLinked?: boolean
}
