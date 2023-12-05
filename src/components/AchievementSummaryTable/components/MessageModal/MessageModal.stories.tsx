import React from 'react'

import MessageModal from '.'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MessageModal> = {
  title: 'Achievements/AchievementSummaryTable/MessageModal',
  component: MessageModal
}

export default meta
type Story = StoryObj<typeof MessageModal>

const props = {
    title: 'Oops!',
    message: `It looks like we couldn't find any games in your Steam account at the moment. Just a quick reminder to double-check that your game details are set to public. This way, we can access your achievements and provide you with the best experience.`
}

export const Default: Story = {
    args: { ...props },
    render: (args)=>{
      return <div style={{ maxWidth: '540px' }}><MessageModal {...args} /></div>
    }
  }