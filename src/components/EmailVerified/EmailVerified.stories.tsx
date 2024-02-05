import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import EmailVerifiedModal from './index'

const meta: Meta<typeof EmailVerifiedModal> = {
  title: 'auth/EmailVerifiedModal',
  args: {
    onContinue: fn()
  }
}

type Story = StoryObj<typeof EmailVerifiedModal>

export default meta

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <EmailVerifiedModal {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const onContinue = args.onContinue
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /continue/i }))
    await expect(onContinue).toHaveBeenCalled()
  }
}
