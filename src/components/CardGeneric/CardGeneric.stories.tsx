import type { Meta, StoryObj } from '@storybook/react'

import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'

import { CardGeneric, CardGenericProps } from '.'

const meta: Meta<typeof CardGeneric> = {
  title: 'CardGeneric',
  component: CardGeneric
}

export default meta

type Story = StoryObj<typeof CardGeneric>

const props: CardGenericProps = {
  children: <h1>Hello</h1>,
  image: cupheadCard
}

export const Default: Story = {
  args: { ...props }
}

export const WithLabel: Story = {
  args: { ...props, i18n: { label: 'Label' }, showLabel: true }
}
