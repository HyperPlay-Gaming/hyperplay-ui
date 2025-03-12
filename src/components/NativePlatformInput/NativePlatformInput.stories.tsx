import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Arch } from '@/common/types'

import { NativePlatformInput, PlatformInputProps } from '.'

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
    amd64: { onChange: () => {} },
    arm64: { onChange: () => {} }
  }
}

export const Default: Story = {
  args: { ...props }
}

export const Mac: Story = {
  args: { ...props, platformName: 'darwin', fileNameArm64: undefined },
  render: (args) => {
    const [file, setFile] = useState<string>('')
    return (
      <NativePlatformInput
        {...args}
        updateFile={(file) => setFile(file.name)}
        clearFile={() => setFile('')}
        fileNameAmd64={file}
      ></NativePlatformInput>
    )
  }
}

export const WithI18n: Story = {
  args: { ...props, platformName: 'darwin', fileNameArm64: undefined },
  render: (args) => {
    const [file, setFile] = useState<string>('')
    return (
      <NativePlatformInput
        {...args}
        i18n={{ upload: { chooseFile: 'Elige archivo' } }}
        updateFile={(file) => setFile(file.name)}
        clearFile={() => setFile('')}
        fileNameAmd64={file}
      ></NativePlatformInput>
    )
  }
}
