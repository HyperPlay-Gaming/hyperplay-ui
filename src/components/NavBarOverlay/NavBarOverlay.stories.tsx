import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Home, QuestIcon, TrophyOutline } from '@/assets/images'

import { NavBarOverlay, NavBarOverlayProps } from '.'
import { NavItem } from '../NavItem'

const meta: Meta<typeof NavBarOverlay> = {
  title: 'Overlay/NavBarOverlay',
  component: NavBarOverlay
}

export default meta

type Story = StoryObj<typeof NavBarOverlay>

const props: NavBarOverlayProps = {
  setCollapsed: (collapsed) => console.log(collapsed),
  linkItems: []
}

export const Default: Story = {
  args: { ...props },
  render: (args) => {
    const [selectedRoute, setSelectedRoute] = useState('/quests')
    const [collapsed, setCollapsed] = useState(false)
    args.linkItems = [
      <NavItem
        title={'Quests'}
        route={'/quests'}
        icon={<QuestIcon fill="white" />}
        alertNumber={10}
        key={'/quests'}
        onClick={() => setSelectedRoute('/quests')}
        collapsed={collapsed}
        currentRoute={selectedRoute}
      />,
      <NavItem
        title={'Marketplace'}
        route={'/marketplace'}
        icon={<Home fill="white" />}
        key={'/marketplace'}
        onClick={() => setSelectedRoute('/marketplace')}
        collapsed={collapsed}
        currentRoute={selectedRoute}
      />,
      <NavItem
        title={'Achievements'}
        route={'/achievements'}
        icon={<TrophyOutline fill="white" />}
        key={'/achievements'}
        onClick={() => setSelectedRoute('/achievements')}
        collapsed={collapsed}
        currentRoute={selectedRoute}
        comingSoon={true}
      />
    ]
    console.log('selected route ', selectedRoute)
    return (
      <NavBarOverlay
        {...args}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    )
  }
}
