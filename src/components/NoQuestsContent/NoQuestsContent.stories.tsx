import type { Meta, StoryObj } from '@storybook/react'

import NoQuestsContent from '.'

const meta: Meta<typeof NoQuestsContent> = {
  title: 'Quests/NoQuestsContent',
  component: NoQuestsContent
}

export default meta

type Story = StoryObj<typeof NoQuestsContent>

export const Default: Story = {
  args: {
    onCreateNewQuest: () => { 
      console.log('clicked') 
    },
  }
}
