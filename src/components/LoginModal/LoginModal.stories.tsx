import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import LoginModal from '@/components/LoginModal/index'

const meta: Meta<typeof LoginModal> = {
  title: 'auth/LoginModal',
  args: {
    onClose: fn(),
    onSubmit: fn()
  }
}

export default meta

type Story = StoryObj<typeof LoginModal>

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoginModal {...args} />
      </div>
    )
  },
  play: async ({ canvasElement, args }) => {
    const onEmailSubmit = args.onSubmit
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter your email')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.click(canvas.getByRole('button', { name: /login/i }))
    await expect(onEmailSubmit).toHaveBeenCalledWith('test@example.com')
  }
}

export const Loading: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LoginModal {...args} loading={true} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const onEmailSubmit = args.onSubmit
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter your email')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.click(canvas.getByRole('button', { name: /loading/i }))
    await expect(onEmailSubmit).not.toHaveBeenCalled()
  }
}

export const Error: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LoginModal
        error="Woops! Explain error."
        onClose={() => alert('Close')}
        onSubmit={(email) => alert(`Email requested: ${email}`)}
      />
    </div>
  )
}
