import type { Meta, StoryObj } from '@storybook/react'

import MarkdownDescription, { MarkdownDescriptionProps } from '.'

const meta: Meta<typeof MarkdownDescription> = {
  title: 'Utilities/MarkdownDescription',
  component: MarkdownDescription
}

export default meta

type Story = StoryObj<typeof MarkdownDescription>

const props: MarkdownDescriptionProps = {
  children:
    '**Good luck, adventurer!** For more details, visit [hyperplay.xyz](https://hyperplay.xyz)'
}

export const Default: Story = {
  args: { ...props }
}
