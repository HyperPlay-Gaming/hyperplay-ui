import type { Meta, StoryObj } from '@storybook/react'

import InfoButton, { InfoButtonProps } from '.'

const meta: Meta<typeof InfoButton> = {
  title: 'DevPortal/InfoButton',
  component: InfoButton
}

export default meta

type Story = StoryObj<typeof InfoButton>

const props: InfoButtonProps = {
  opened: false
}

export const Default: Story = {
  args: { ...props }
}

export const Opened: Story = {
  args: { ...props, opened: true }
}
