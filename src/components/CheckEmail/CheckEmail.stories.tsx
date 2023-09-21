import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import CheckEmailModal from './index'

const meta: Meta<typeof CheckEmailModal> = {
  title: 'auth/CheckEmail',
  component: CheckEmailModal
}

export default meta

type Story = StoryObj<typeof CheckEmailModal>

export const Default: Story = {
  render: () => (
    <CheckEmailModal
      style={{ margin: 'auto' }}
      email="hello@hyperplay.xyz"
      onClose={() => alert('Close')}
      onResend={() => alert('Resend email')}
      onVerify={() => alert('Resend email')}
    />
  )
}
