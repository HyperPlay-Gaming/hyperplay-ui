import Sticker from '@/components/Sticker'
import { QuestType, Quest } from '@/common/types'

export type QuestListProps = {
  i18n: {
    selected: boolean
    title: string
    duration: string
    resetTime: string
    time: string
    questType: QuestType
    reward: string
    viewAllButton: string
    badgeOne: typeof Sticker
    badgeTwo: typeof Sticker
    quests: Quest[]
    state: 'READY_FOR_CLAIM' | 'ACTIVE'
  }
}
