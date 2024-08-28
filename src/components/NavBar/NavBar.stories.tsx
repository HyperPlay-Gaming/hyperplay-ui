import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { AccountAvatar } from '@/index'

import NavBar from '.'

// add storybook meta data
const meta: Meta<typeof NavBar> = {
  title: 'NavBar',
  component: NavBar
}

type Story = StoryObj<typeof NavBar>

export default meta

export const Default = () => <NavBar />

export const WithUserAvatar: Story = {
  args: {
    UserAvatar: <AccountAvatar userId="johndoe@mail.com" />
  }
}
