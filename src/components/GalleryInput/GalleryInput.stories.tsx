import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import GalleryInput, { GalleryInputProps } from '.'

const meta: Meta<typeof GalleryInput> = {
  title: 'DevPortal/GalleryInput',
  component: GalleryInput
}

export default meta

type Story = StoryObj<typeof GalleryInput>

const props: GalleryInputProps = {
  onChange: (val) => console.log(val)
}

export const Default: Story = {
  args: { ...props },
  render: () => {
    const [files, setFiles] = useState<string[]>([])
    return <GalleryInput value={files} onChange={setFiles} />
  }
}
