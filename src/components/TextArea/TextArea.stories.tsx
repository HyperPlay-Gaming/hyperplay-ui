import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from '.'

const meta: Meta<typeof Textarea> = {
  title: 'forms/Textarea',
  component: Textarea,
  args: {
    label: 'Description',
    rows: 5
  }
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const SmallSize: Story = {
  args: { size: 'small' }
}

export const MediumSize: Story = {
  args: { size: 'medium' }
}

export const LargeSize: Story = {
  args: { size: 'large' }
}

export const WithCharacterLimit: Story = {
  args: { maxCharacters: 10 }
}

export const Error: Story = {
  args: { error: 'Required', withAsterisk: true }
}
