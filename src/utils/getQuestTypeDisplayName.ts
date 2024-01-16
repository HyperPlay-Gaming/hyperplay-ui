import { QuestType, QuestTypeTranslations } from '@/common/types'

export function getQuestTypeDisplayName(
    type: QuestType,
    i18n: QuestTypeTranslations
  ) {
    switch (type) {
      case 'REPUTATION':
        return i18n.REPUTATION
      default:
        return i18n.REPUTATION
    }
}