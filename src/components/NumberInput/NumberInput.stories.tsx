import type { Meta, StoryObj } from '@storybook/react'

import NumberInput from './index'

const meta: Meta<typeof NumberInput> = {
  title: 'forms/NumberInput',
  component: NumberInput,
  args: {
    label: 'Number Input',
    placeholder: 'Enter a number'
  }
}

export default meta

type Story = StoryObj<typeof NumberInput>

export const Default: Story = {}

export const Small: Story = {
  args: { size: 'small' }
}

export const Medium: Story = {
  args: { size: 'medium' }
}

export const Large: Story = {
  args: { size: 'large' }
}

export const WithRightSection: Story = {
  args: { rightSection: '$' }
}

export const Error: Story = {
  args: { error: 'This is an error' }
}
