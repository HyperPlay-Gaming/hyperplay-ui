import type { Meta, StoryObj } from '@storybook/react'

import { SelectCreatable, SelectCreatableProps } from '.'

const meta: Meta<typeof SelectCreatable> = {
  title: 'DevPortal/SelectCreatable',
  component: SelectCreatable
}

export default meta

type Story = StoryObj<typeof SelectCreatable>

const props: SelectCreatableProps = {
    options: [
        '🍎 Apples',
        '🍌 Bananas',
        '🥦 Broccoli',
        '🥕 Carrots',
        '🍫 Chocolate',
        '🍇 Grapes'
      ],
      onChange: (val)=>console.log('changed to ', val),
      onCreated: (val)=>console.log('created ', val)
}

export const Default: Story = {
  args: { ...props }
}
