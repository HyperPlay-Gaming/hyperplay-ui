import type { Meta, StoryObj } from '@storybook/react'

import AsyncTextInput, { AsyncTextInputProps } from '.'

const meta: Meta<typeof AsyncTextInput> = {
  title: 'DevPortal/AsyncTextInput',
  component: AsyncTextInput
}

export default meta

type Story = StoryObj<typeof AsyncTextInput>

const props: AsyncTextInputProps = {}

export const Default: Story = {
  args: { ...props }
}
