import React from 'react'

import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { Mock, fn } from '@storybook/test'
import { fireEvent, within } from '@storybook/testing-library'

import SignInModal from '@/components/SignIn/index'

const meta: Meta<typeof SignInModal> = {
  title: 'auth/SignIn',
  args: {
    onClose: fn(),
    onSubmit: fn()
  }
}

export default meta

type Story = StoryObj<typeof SignInModal>

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SignInModal {...args} />
      </div>
    )
  },
  play: async ({ canvasElement, args }) => {
    const onEmailSubmit = args.onSubmit as Mock
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter your email')
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' }
    })
    fireEvent.click(canvas.getByRole('button', { name: /sign in/i }))
    await expect(onEmailSubmit).toHaveBeenCalledWith('test@example.com')
  }
}

export const Loading: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <SignInModal {...args} loading={true} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const onEmailSubmit = args.onSubmit as Mock
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter your email')
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' }
    })
    fireEvent.click(canvas.getByRole('button', { name: /loading/i }))
    await expect(onEmailSubmit).not.toHaveBeenCalled()
  }
}

export const Error: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <SignInModal
        error="Woops! Explain error."
        onClose={() => alert('Close')}
        onSubmit={(email) => alert(`Email requested: ${email}`)}
      />
    </div>
  )
}
