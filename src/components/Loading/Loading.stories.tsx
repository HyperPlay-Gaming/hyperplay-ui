import React from 'react'

import Loading from '.'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Loading> = {
  title: 'Loading',
  component: Loading
}

export default meta

type Story = StoryObj<typeof Loading>

export const Default: Story = {}
  