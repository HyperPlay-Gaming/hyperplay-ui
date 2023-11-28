import type { Meta, StoryObj } from '@storybook/react'

import Alert, { AlertProps } from '.'

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert
}

export default meta

type Story = StoryObj<typeof Alert>

const props: AlertProps = {
  message: 'I\'m an info alert by default',
}

export const Default: Story = {
  args: { ...props }
}

export const Warning: Story = {
  args: {
    ...props,
    message: "Using `import sdk from '@hyperplay/sdk` is not recommended. Please import the necessary functions only.",
    variant: 'warning',
  }
}

export const Info: Story = {
  args: {
    ...props,
    message: 'Game Points are being pending, please wait until payment processor has handled your transaction',
    variant: 'info',
  }
}

export const Success: Story = {
  args: {
    ...props,
    message: "Awesome! You've downloaded Gods of Zushin successfully",
    variant: 'success',
  }
}

export const Danger: Story = {
  args: {
    ...props,
    message: 'Unable to sign in, please try again later.',
    variant: 'danger',
  }
}
