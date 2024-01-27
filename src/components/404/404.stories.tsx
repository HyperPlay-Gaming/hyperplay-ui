import type { Meta, StoryObj } from '@storybook/react'

import _404, { _404Props } from '.'
import Button from '../Button'

const meta: Meta<typeof _404> = {
  title: 'DevPortal/404',
  component: _404
}

export default meta

type Story = StoryObj<typeof _404>

const props: _404Props = {
  message:
    'Seems a slight error occurred, no biggie click on the button below and we would happily guide you back to safety.',
  action: <Button>Go Back</Button>
}

export const Default: Story = {
  args: { ...props }
}
