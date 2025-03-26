import type { Meta, StoryObj } from '@storybook/react'

import { PlatformsSupported, PlatformsSupportedProps } from '.'

const meta: Meta<typeof PlatformsSupported> = {
  title: 'Game Details/PlatformsSupported',
  component: PlatformsSupported
}

export default meta

type Story = StoryObj<typeof PlatformsSupported>

const props: PlatformsSupportedProps = {
  platformsWithBuilds: ['windows_amd64']
}

export const Default: Story = {
  args: { ...props }
}
