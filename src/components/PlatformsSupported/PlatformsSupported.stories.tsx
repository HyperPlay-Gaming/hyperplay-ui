import { wait } from '@hyperplay/utils'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

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

export const OnlyWindows: Story = {
  args: { ...props }
}

export const OnlyMac: Story = {
  args: { ...props, platformsWithBuilds: ['darwin_amd64'] }
}

export const OnlyLinux: Story = {
  args: { ...props, platformsWithBuilds: ['linux_amd64'] }
}

export const AllPlatforms: Story = {
  args: {
    ...props,
    platformsWithBuilds: [
      'darwin_amd64',
      'darwin_arm64',
      'windows_amd64',
      'windows_arm64',
      'linux_arm64',
      'linux_amd64',
      'web',
      'webgl',
      'android_arm64'
    ]
  }
}

export const TestHoverI: Story = {
  args: { ...props },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const infoIcon = canvas.getByTestId('platforms-supported-info-icon')
    userEvent.hover(infoIcon)
    await wait(500)
    const popover = canvas.getByTestId('platforms-supported-info-popover')
    expect(popover).toBeVisible()
    userEvent.unhover(infoIcon)
  }
}
