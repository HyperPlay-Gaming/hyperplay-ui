import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import CheckEmailModal from './index'

const meta: Meta<typeof CheckEmailModal> = {
  title: 'auth/CheckEmail',
  args: {
    email: 'hello@hyperplay.xyz',
    onClose: fn(),
    onResend: fn()
  }
}

export default meta

type Story = StoryObj<typeof CheckEmailModal>

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CheckEmailModal {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const onResend = args.onResend
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole('button', { name: /click to resend/i })
    )
    await expect(onResend).toHaveBeenCalled()
    await expect(canvas.getByText(/retry in/i)).toBeInTheDocument()
  }
}

export const Timeout: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CheckEmailModal {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const onResend = args.onResend
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole('button', { name: /click to resend/i })
    )
    await expect(canvas.getByText(/retry in/i)).toBeInTheDocument()
    await userEvent.click(canvas.getByText(/retry in/i))
    await userEvent.click(canvas.getByText(/retry in/i))
    await expect(onResend).toHaveBeenCalledOnce()
  }
}
