import { HTMLProps } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import DarkContainer from '.'

const meta: Meta<typeof DarkContainer> = {
  title: 'Containers/DarkContainer',
  component: DarkContainer
}

export default meta

type Story = StoryObj<typeof DarkContainer>

const props: HTMLProps<HTMLDivElement> = {
  children: <h1>Hello</h1>,
  style: {
    padding: 16,
    maxWidth: 600,
    textAlign: 'center'
  }
}

export const Default: Story = {
  args: { ...props }
}
