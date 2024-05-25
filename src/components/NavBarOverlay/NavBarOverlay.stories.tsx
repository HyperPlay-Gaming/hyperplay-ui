import { HashRouter } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react'

import { QuestScroll, TrophyOutline } from '@/assets/images'

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
      icon: <QuestScroll fill="white" />,
      alertNumber: 10
    },
    {
      title: 'Achievements (soon)',
      route: '/achievements',
      icon: <TrophyOutline fill="white" />
    }
  ]
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
