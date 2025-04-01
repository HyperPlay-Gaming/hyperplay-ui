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
  platformsWithBuilds: ['windows_amd64'],
  style: { margin: '16px' }
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

// test that popover shows on info icon hover
export const TestHoverI: Story = {
  args: { ...props },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const infoIcon = canvas.getByTestId('platforms-supported-info-icon')
    userEvent.hover(infoIcon)
    await wait(500)
    const popover = canvas.getByTestId('platforms-supported-info-popover')
    await expect(popover).toBeVisible()
    userEvent.unhover(infoIcon)
  }
}

// expect built for to be above the playable on section when it switches to flex column for mobile
export const TestMobileResponsive: Story = {
  args: { ...props },
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await wait(500)
    const builtForContainer = canvas.getByTestId(
      'platforms-supported-built-for-container'
    )
    const playableOnContainer = canvas.getByTestId(
      'platforms-supported-playable-on-container'
    )
    await expect(builtForContainer.getBoundingClientRect().bottom).toBeLessThan(
      playableOnContainer.getBoundingClientRect().top
    )
  }
}
