import type { Meta, StoryObj } from '@storybook/react'

import List, { ListProps } from '.'

const meta: Meta<typeof List> = {
  title: 'DevPortal/List',
  component: List
}

export default meta

type Story = StoryObj<typeof List>

const props: ListProps = {
  children: (
    <>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
    </>
  )
}

export const Default: Story = {
  args: { ...props }
}
