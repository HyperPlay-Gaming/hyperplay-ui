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
      questType: 'REPUTATIONAL-AIRDROP',
      onClick: () => {
        console.log('1st Quest Clicked!')
      },
      selected: true,
      id: 0
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'READY_FOR_CLAIM',
      questType: 'REPUTATIONAL-AIRDROP',
      id: 1
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATIONAL-AIRDROP',
      selected: true,
      id: 2
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATIONAL-AIRDROP',
      id: 3
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'CLAIMED',
      questType: 'REPUTATIONAL-AIRDROP',
      selected: true,
      id: 4
    },
    {
      title:
        'A reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeally long title',
      state: 'CLAIMED',
      questType: 'REPUTATIONAL-AIRDROP',
      id: 5
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}

export const Loading: Story = {
  args: { ...props },
  render: (args) => {
    return <QuestLog {...args} loading={true} />
  }
}

export const NoneReadyForClaim: Story = {
  args: {
    ...props,
    quests: [
      {
        title: 'Eternal Ember: Shadows of the Celestial Nexus',
        state: 'ACTIVE',
        questType: 'PLAYSTREAK',
        id: 3
      }
    ]
  }
}
