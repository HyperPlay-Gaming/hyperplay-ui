import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import SignInModal from '@/components/SignIn/index'

const meta: Meta<typeof SignInModal> = {
  title: 'auth/SignIn'
}

export default meta

type Story = StoryObj<typeof SignInModal>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <SignInModal
        onClose={() => alert('Close')}
        onSubmit={(email) => alert(`Email requested: ${email}`)}
      />
    </div>
  )
}

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <SignInModal
        loading={true}
        onClose={() => alert('Close')}
        onSubmit={(email) => alert(`Email requested: ${email}`)}
      />
    </div>
  )
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
