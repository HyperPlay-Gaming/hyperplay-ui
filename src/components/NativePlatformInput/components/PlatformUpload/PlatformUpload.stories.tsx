import type { Meta, StoryObj } from '@storybook/react'

import PlatformUpload, { PlatformUploadProps } from '.'

const meta: Meta<typeof PlatformUpload> = {
  title: 'DevPortal/PlatformUpload',
  component: PlatformUpload
}

export default meta

type Story = StoryObj<typeof PlatformUpload>

const props: PlatformUploadProps = {
  platformName: 'Windows (Intel / amd64)',
  uploaded: false,
  onExePathChanged: (path: File | null) => {console.log(path?.name)},
  onRemoveUpload: () => console.log('remove upload'),
  exeInputProps: {
    value: 'Test.exe'
  }
}

export const Default: Story = {
  args: { ...props }
}
