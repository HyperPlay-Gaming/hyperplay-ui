import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import ImageInput, { ImageInputProps } from '.'

const meta: Meta<typeof ImageInput> = {
  title: 'DevPortal/ImageInput',
  component: ImageInput
}

export default meta

type Story = StoryObj<typeof ImageInput>

const props: ImageInputProps = {
  onImageDropped: (val) => console.log(val),
  value:
    'https://www.hyperplay.xyz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FmainBgFrameCircles.3347b47b.png&w=3840&q=75'
}

export const Default: Story = {
  args: { ...props },
  render: (args) => {
    const [file, setFile] = useState<string | undefined>(
      'https://www.hyperplay.xyz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FmainBgFrameCircles.3347b47b.png&w=3840&q=75'
    )
    return (
      <ImageInput
        {...args}
        value={file}
        // @ts-expect-error @todo fix type
        onImageDropped={setFile}
        style={{ maxHeight: 500, display: 'inline-block', height: 500 }}
      />
    )
  }
}
