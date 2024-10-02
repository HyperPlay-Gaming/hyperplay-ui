import { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react'

import { Home, QuestIcon, TrophyOutline } from '@/assets/images'

import { NavBarOverlay, NavBarOverlayProps } from '.'

const meta: Meta<typeof NavBarOverlay> = {
  title: 'Overlay/NavBarOverlay',
  component: NavBarOverlay
}

export default meta

type Story = StoryObj<typeof NavBarOverlay>

const props: NavBarOverlayProps = {
  currentRoute: '/quests',
  items: [
    {
      title: 'Quests',
      route: '/quests',
      icon: <QuestIcon fill="white" />,
      alertNumber: 10
    },
    {
      title: 'Marketplace',
      route: '/marketplace',
      icon: <Home fill="white" />
    },
    {
      title: 'Achievements',
      route: '/achievements',
      icon: <TrophyOutline fill="white" />
    }
  ]
}

export const Default: Story = {
  args: { ...props },
  render: (args) => {
    const [selectedRoute, setSelectedRoute] = useState(args.items[0].route)
    args.items.forEach((val) => {
      val.linkProps = { onClick: () => setSelectedRoute(val.route) }
      return val
    })
    return (
      <HashRouter>
        <NavBarOverlay {...args} currentRoute={selectedRoute} />
      </HashRouter>
    )
  }
}

export const Disabled: Story = {
  args: { ...props },
  render: (args) => {
    const [selectedRoute, setSelectedRoute] = useState(args.items[0].route)
    args.items.forEach((val, index) => {
      val.linkProps = { onClick: () => setSelectedRoute(val.route) }
      if (index > 0) val.linkProps.style = { pointerEvents: 'none' }
      return val
    })
    console.log('selected route is ', selectedRoute)
    return (
      <HashRouter>
        <NavBarOverlay {...args} currentRoute={selectedRoute} />
      </HashRouter>
    )
  }
}
