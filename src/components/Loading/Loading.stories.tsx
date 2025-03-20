import { Meta, StoryObj } from '@storybook/react'

import Loading from '.'

const meta: Meta<typeof Loading> = {
  title: 'Loading',
  component: Loading
}

export default meta

type Story = StoryObj<typeof Loading>

export const Default: Story = {}

export const Big: Story = {
  args: {
    loaderProps: {
      size: 60
    }
  }
}
