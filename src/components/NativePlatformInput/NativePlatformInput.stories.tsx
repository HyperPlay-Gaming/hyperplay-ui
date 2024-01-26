import type { Meta, StoryObj } from '@storybook/react'

import { Arch } from '@/common/types'

import NativePlatformInput, { PlatformInputProps } from '.'

const meta: Meta<typeof NativePlatformInput> = {
  title: 'DevPortal/NativePlatformInput',
  component: NativePlatformInput
}

export default meta

type Story = StoryObj<typeof NativePlatformInput>

const props: PlatformInputProps = {
  platformName: 'windows',
  fileNameAmd64: 'test',
  fileNameArm64: 'test',
  clearFile: (arch: Arch) => console.log(arch),
  updateFile: (file: File, arch: Arch) =>
    console.log('update file ', file.name, ' arch ', arch),
  exeInputProps: {
    amd64: {},
    arm64: {}
  }
}

export const Default: Story = {
  args: { ...props }
}

export const Mac: Story = {
  args: { ...props, platformName: 'darwin', fileNameArm64: undefined }
}
