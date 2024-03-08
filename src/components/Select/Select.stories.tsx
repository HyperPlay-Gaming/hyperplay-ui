import type { Meta, StoryObj } from '@storybook/react'

import Select from './index'

const meta: Meta<typeof Select> = {
  title: 'forms/Select',
  component: Select,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    }
  },
  args: {
    size: 'medium',
    placeholder: 'Select Option',
    data: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' }
    ]
  }
}

type Story = StoryObj<typeof Select>

export default meta

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Select Option'
  }
}

export const Error: Story = {
  args: {
    error: 'Invalid Option'
  }
}

export const SmallSize: Story = {
  args: {
    size: 'small'
  }
}

export const MediumSize: Story = {
  args: {
    size: 'medium'
  }
}

export const LargeSize: Story = {
  args: {
    size: 'large'
  }
}
