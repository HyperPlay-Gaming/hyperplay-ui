import { Quest } from '@hyperplay/utils'

import { QuestType } from '@/common/types'
import Sticker from '@/components/Sticker'

export type QuestListProps = {
  selected: boolean
  i18n?: {
    title: string
    duration: string
    resetTime: string
    time: string
    reward: string
    viewAllButton: string
  }
  state: string
  questType: QuestType
  quests: Quest[]
  badgeOne: typeof Sticker
  badgeTwo: typeof Sticker
}
