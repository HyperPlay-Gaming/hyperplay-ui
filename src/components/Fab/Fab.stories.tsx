import type { Meta, StoryObj } from '@storybook/react'
import { IconCoin, IconSettings } from '@tabler/icons-react'

import Fab, { FabProps } from '.'

const meta: Meta<typeof Fab> = {
  title: 'DevPortal/Fab',
  component: Fab
}

export default meta

type Story = StoryObj<typeof Fab>

const props: FabProps = {
  children: (
    <>
      <Fab.Button label="Pricing">
        <IconCoin size={32} />
      </Fab.Button>
      <Fab.Button label="Settings">
        <IconSettings size={32} />
      </Fab.Button>
    </>
  )
}

export const Default: Story = {
  args: { ...props },
  render: (args) => (
    <div>
      <Fab {...args} />
    </div>
  )
}
