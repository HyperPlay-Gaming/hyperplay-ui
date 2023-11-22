import React from 'react'

import { Meta } from '@storybook/react'

import EmailVerified from './index'

const meta: Meta<typeof EmailVerified> = {
  title: 'auth/EmailVerified',
  component: EmailVerified
}

export default meta

export const Default = () => (
  <EmailVerified
    style={{ margin: 'auto' }}
    onContinue={() => alert('Continue')}
  />
)
