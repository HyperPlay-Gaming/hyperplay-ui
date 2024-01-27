import type { Meta, StoryObj } from '@storybook/react'

import { WebPlatformInput, WebPlatformInputProps } from '.'

const meta: Meta<typeof WebPlatformInput> = {
  title: 'DevPortal/WebPlatformInput',
  component: WebPlatformInput
}

export default meta

type Story = StoryObj<typeof WebPlatformInput>

const props: WebPlatformInputProps = {}

export const Default: Story = {
  args: { ...props }
}
