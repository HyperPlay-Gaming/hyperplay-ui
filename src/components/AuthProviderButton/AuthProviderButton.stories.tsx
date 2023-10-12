import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { MetamaskColored } from '@/assets/images'

import AuthProviderButton from './index'

const meta: Meta<typeof AuthProviderButton> = {
  title: 'auth/AuthProviderButton',
  component: AuthProviderButton,
  argTypes: {
    name: {
      control: {
        type: 'text'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    },
    connected: {
      control: {
        type: 'boolean',
        defaultValue: false
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof AuthProviderButton>

export const Default: Story = {
  args: {
    name: 'MetaMask',
    icon: <MetamaskColored />
  }
}

export const WithLabel: Story = {
  args: {
    name: 'MetaMask',
    icon: <MetamaskColored />,
    label: <AuthProviderButton.Label>Soon</AuthProviderButton.Label>
  }
}

export const WithStyledLabel: Story = {
  args: {
    name: 'MetaMask',
    icon: <MetamaskColored />,
    label: (
      <AuthProviderButton.Label style={{ color: 'var(--color-primary-200)' }}>
        Recommended
      </AuthProviderButton.Label>
    )
  }
}

export const Connected: Story = {
  args: {
    name: 'MetaMask',
    icon: <MetamaskColored />,
    connected: true
  }
}
