import type { Meta, StoryObj } from '@storybook/react'

import PlatformContainer, { PlatformContainerProps } from '.'

const meta: Meta<typeof PlatformContainer> = {
  title: 'DevPortal/PlatformContainer',
  component: PlatformContainer
}

export default meta

type Story = StoryObj<typeof PlatformContainer>

const props: PlatformContainerProps = {
  platformName: 'windows',
  children: <div>Some Content!</div>
}

export const Default: Story = {
  args: { ...props }
}

export const Mac: Story = {
  args: { ...props, platformName: 'darwin' }
}
