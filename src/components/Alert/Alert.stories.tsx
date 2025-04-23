import type { Meta, StoryObj } from '@storybook/react'
import Alert from '.'

import { CloseButton } from '@/assets/images'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    },
    showClose: {
      control: 'boolean'
    },
    button: {
      control: 'text'
    }
  }
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof Alert>

const props = {
  message: 'Lorem ipsum dolor sit amet consec tetur adipiscing elit',
  closeButton: <CloseButton />,
  onClose: () => {}
}

export const Danger: Story = {
  args: {
    ...props,
    variant: 'danger'
  }
}

export const Warning: Story = {
  args: {
    ...props,
    variant: 'warning'
  }
}

export const Success: Story = {
  args: {
    ...props,
    variant: 'success'
  }
}

export const Info: Story = {
  args: {
    ...props,
    variant: 'info'
  }
}

export const Neutral: Story = {
  args: {
    ...props,
    variant: 'neutral'
  }
}

export const Brand: Story = {
  args: {
    ...props,
    variant: 'brand'
  }
}
