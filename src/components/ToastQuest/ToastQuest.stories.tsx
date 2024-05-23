import type { Meta, StoryObj } from '@storybook/react'

import { ToastQuest, ToastQuestProps } from '.'

const meta: Meta<typeof ToastQuest> = {
  title: 'ToastQuest',
  component: ToastQuest
}

export default meta

type Story = StoryObj<typeof ToastQuest>

const props: ToastQuestProps = {
  status: 'available',
  onCloseClick: () => console.log('close clicked!')
}

export const Default: Story = {
  args: { ...props }
}

export const Completed: Story = {
  args: { ...props, status: 'completed' }
}
