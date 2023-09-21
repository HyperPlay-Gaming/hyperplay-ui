import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import EmailVerified from './index'

const meta: Meta<typeof EmailVerified> = {
  title: 'auth/EmailVerified',
  component: EmailVerified
}

export default meta

type Story = StoryObj<typeof EmailVerified>

export const Default: Story = {
  render: () => (
    <EmailVerified
      onClose={() => alert('Close')}
      style={{ margin: 'auto' }}
      onContinue={() => alert('Continue')}
    />
  )
}
