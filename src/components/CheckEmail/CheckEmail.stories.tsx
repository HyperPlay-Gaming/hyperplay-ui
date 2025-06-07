import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { CheckmarkCircleOutline, XCircle } from '@/assets/images'
import Loading from '@/components/Loading'

import CheckEmailModal from './index'

const meta: Meta<typeof CheckEmailModal> = {
  title: 'auth/CheckEmailModal',
  args: {
    email: 'hello@hyperplay.xyz',
    onClose: fn(),
    onResend: fn(),
    onReEnterEmail: fn()
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
    const onReEnterEmail = args.onReEnterEmail
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /resend email/i }))
    await expect(onResend).toHaveBeenCalled()
    await expect(canvas.getByText(/retry in/i)).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: /change email/i }))
    await expect(onReEnterEmail).toHaveBeenCalled()
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
    await userEvent.click(canvas.getByRole('button', { name: /resend email/i }))
    await expect(canvas.getByText(/retry in/i)).toBeInTheDocument()
    await userEvent.click(canvas.getByText(/retry in/i))
    await userEvent.click(canvas.getByText(/retry in/i))
    await expect(onResend).toHaveBeenCalledOnce()
  }
}

export const WithLoadingCodeVerification: Story = {
  args: {
    codeInputProps: {
      disabled: true,
      rightSection: <Loading style={{ width: 20, height: 20 }} />
    }
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CheckEmailModal {...args} />
    </div>
  )
}

export const WithSuccessCode: Story = {
  args: {
    codeInputProps: {
      rightSection: (
        <CheckmarkCircleOutline
          fill="var(--color-success-400)"
          width={20}
          height={20}
        />
      )
    }
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CheckEmailModal {...args} />
    </div>
  )
}

export const WithErrorCode: Story = {
  args: {
    codeInputProps: {
      error: 'Verification failed. Please try again.',
      rightSection: <XCircle width={20} height={20} />
    }
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CheckEmailModal {...args} />
    </div>
  )
}

export const WithErrorCodeOpenedDefault: Story = {
  args: {
    codeInputProps: {
      error: 'Verification failed. Please try again.',
      rightSection: <XCircle width={20} height={20} />
    }
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CheckEmailModal {...args} />
    </div>
  )
}
