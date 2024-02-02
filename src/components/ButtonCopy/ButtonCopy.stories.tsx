import type { Meta, StoryObj } from '@storybook/react'

import { ButtonCopy, ButtonCopyProps } from '.'

const meta: Meta<typeof ButtonCopy> = {
  title: 'ButtonCopy',
  component: ButtonCopy
}

export default meta

type Story = StoryObj<typeof ButtonCopy>

const props: ButtonCopyProps = {
  text: 'some text'
}

export const Default: Story = {
  args: { ...props }
}
