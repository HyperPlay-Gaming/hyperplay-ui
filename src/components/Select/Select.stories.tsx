import type { Meta, StoryObj } from '@storybook/react'

import TextInput from '@/components/TextInput'

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

export const NextToTextInput: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Select placeholder="Select Option" data={args.data} />
      <TextInput placeholder="Enter text" />
    </div>
  )
}
