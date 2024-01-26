import { HTMLProps } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { CreatableSelect } from '.'

const meta: Meta<typeof CreatableSelect> = {
  title: 'DevPortal/CreatableSelect',
  component: CreatableSelect
}

export default meta

type Story = StoryObj<typeof CreatableSelect>

const props: HTMLProps<HTMLDivElement> = {
    options: [
        '🍎 Apples',
        '🍌 Bananas',
        '🥦 Broccoli',
        '🥕 Carrots',
        '🍫 Chocolate',
        '🍇 Grapes'
      ]
}

export const Default: Story = {
  args: { ...props }
}
