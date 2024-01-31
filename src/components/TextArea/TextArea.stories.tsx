import type { Meta, StoryObj } from '@storybook/react'

import { Textarea, TextareaProps } from '.'

const meta: Meta<typeof Textarea> = {
  title: 'DevPortal/Textarea',
  component: Textarea
}

export default meta

type Story = StoryObj<typeof Textarea>

const props: TextareaProps = {}

export const Default: Story = {
  args: { ...props }
}
