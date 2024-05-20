import type { Meta, StoryObj } from '@storybook/react'

import { OverlayToast, OverlayToastInterface } from '.'

const meta: Meta<typeof OverlayToast> = {
  title: 'OverlayToast',
  component: OverlayToast
}

export default meta

type Story = StoryObj<typeof OverlayToast>

const props: OverlayToastInterface = {}

export const Default: Story = {
  args: { ...props }
}
