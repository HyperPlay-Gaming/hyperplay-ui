import { HashRouter } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react'

import { NavBarOverlay, NavBarOverlayProps } from '.'

const meta: Meta<typeof NavBarOverlay> = {
  title: 'Overlay/NavBarOverlay',
  component: NavBarOverlay
}

export default meta

type Story = StoryObj<typeof NavBarOverlay>

const props: NavBarOverlayProps = {
  items: [{ title: 'Quests', route: '/quests' }]
}

export const Default: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <HashRouter>
        <NavBarOverlay {...args} />
      </HashRouter>
    )
  }
}
