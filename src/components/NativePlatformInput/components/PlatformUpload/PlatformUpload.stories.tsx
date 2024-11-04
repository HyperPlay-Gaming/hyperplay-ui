import type { Meta, StoryObj } from '@storybook/react'

import PlatformUpload, { PlatformUploadProps } from '.'

const meta: Meta<typeof PlatformUpload> = {
  title: 'DevPortal/NativePlatformInput/PlatformUpload',
  component: PlatformUpload
}

export default meta

type Story = StoryObj<typeof PlatformUpload>

const props: PlatformUploadProps = {
  platformName: 'Windows (Intel / amd64)',
  uploaded: false,
  onExePathChanged: (path: File | null) => {
    console.log(path?.name)
  },
  onRemoveUpload: () => console.log('remove upload'),
  // @ts-expect-error not passing all input props
  exeInputProps: {
    value: 'Test.exe'
  }
}

export const Default: Story = {
  args: { ...props }
}

export const Mac: Story = {
  args: { ...props, platformName: 'macOS (Intel / amd64)', uploaded: true }
}

export const ExeList: Story = {
  args: {
    ...props,
    platformName: 'Windows (Intel / amd64)',
    uploaded: true,
    exeList: ['test.exe']
  }
}
