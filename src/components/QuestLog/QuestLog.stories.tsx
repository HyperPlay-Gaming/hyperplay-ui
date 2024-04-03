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
      questType: 'REPUTATION',
      onClick: () => {
        console.log('1st Quest Clicked!')
      },
      selected: true,
      id: 0
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'READY_FOR_CLAIM',
      questType: 'REPUTATION',
      id: 1
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATION',
      selected: true,
      id: 2
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATION',
      id: 3
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'CLAIMED',
      questType: 'REPUTATION',
      selected: true,
      id: 4
    },
    {
      title:
        'A reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeally long title',
      state: 'CLAIMED',
      questType: 'REPUTATION',
      id: 5
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}

export const Loading: Story = {
  args: { ...props },
  render: (args)=>{
    return <QuestLog {...args} loading={true}/>
  }
}
