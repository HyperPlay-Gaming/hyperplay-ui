import type { Meta, StoryObj } from '@storybook/react'

import QuestLog from '.'
import { QuestLogProps } from './types'

const meta: Meta<typeof QuestLog> = {
  title: 'Quests/QuestLog',
  component: QuestLog
}

export default meta

type Story = StoryObj<typeof QuestLog>

const props: QuestLogProps = {
  quests: [
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'READY_FOR_CLAIM',
      questType: 'REPUTATION'
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'READY_FOR_CLAIM',
      questType: 'REPUTATION'
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATION'
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATION'
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'CLAIMED',
      questType: 'REPUTATION'
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'CLAIMED',
      questType: 'REPUTATION'
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}
