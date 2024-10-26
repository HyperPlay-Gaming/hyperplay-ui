import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Home, MetaMask, QuestIcon, TrophyOutline } from '@/assets/images'

import { NavBarOverlay, NavBarOverlayProps } from '.'
import { NavItem } from '../NavItem'
import { SubLink } from '../NavItem/SubLink'

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
    const [marketplaceCollapsed, marketplaceSetCollapsed] = useState(false)
    const [mmCollapsed, mmSetCollapsed] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    args.linkItems = [
      <NavItem
        title={'Quests'}
        icon={<QuestIcon fill="white" />}
        alertNumber={10}
        key={'/quests'}
        onClick={() => setSelectedRoute('/quests')}
        collapsed={collapsed}
        selected={selectedRoute === '/quests'}
      />,
      <NavItem
        title={'MetaMask'}
        icon={<MetaMask fill="white" />}
        key={'/metamask'}
        onClick={() => mmSetCollapsed(!mmCollapsed)}
        collapsed={collapsed}
        selected={selectedRoute.startsWith('/metamask')}
        subLinksCollapsed={mmCollapsed}
        setSubLinksCollapsed={() => mmSetCollapsed(!mmCollapsed)}
        subLinks={[
          <SubLink
            key={'Portfolio'}
            onClick={() => setSelectedRoute('/metamask/Portfolio')}
            selected={selectedRoute === '/metamask/Portfolio'}
          >
            Portfolio
          </SubLink>,
          <SubLink
            key={'Swap'}
            onClick={() => setSelectedRoute('/metamask/Swap')}
            selected={selectedRoute === '/metamask/Swap'}
          >
            Swap
          </SubLink>,
          <SubLink
            key={'Bridge'}
            onClick={() => setSelectedRoute('/metamask/Bridge')}
            selected={selectedRoute === '/metamask/Bridge'}
          >
            Bridge
          </SubLink>,
          <SubLink
            key={'Buy'}
            onClick={() => setSelectedRoute('/metamask/Buy')}
            selected={selectedRoute === '/metamask/Buy'}
          >
            Buy
          </SubLink>,
          <SubLink
            key={'Sell'}
            onClick={() => setSelectedRoute('/metamask/sell')}
            selected={selectedRoute === '/metamask/sell'}
          >
            Sell
          </SubLink>
        ]}
      />,
      <NavItem
        title={'Marketplace'}
        icon={<Home fill="white" />}
        key={'/marketplace'}
        onClick={() => marketplaceSetCollapsed(!marketplaceCollapsed)}
        collapsed={collapsed}
        selected={selectedRoute.startsWith('/marketplace')}
        subLinksCollapsed={marketplaceCollapsed}
        setSubLinksCollapsed={() =>
          marketplaceSetCollapsed(!marketplaceCollapsed)
        }
        subLinks={[
          <SubLink
            key={'NTx'}
            onClick={() => setSelectedRoute('/marketplace/NTx')}
            selected={selectedRoute === '/marketplace/NTx'}
          >
            NTx
          </SubLink>,
          <SubLink
            key={'XocietyFrontier'}
            onClick={() => setSelectedRoute('/marketplace/XocietyFrontier')}
            selected={selectedRoute === '/marketplace/XocietyFrontier'}
          >
            XocietyFrontier
          </SubLink>
        ]}
      />,
      <NavItem
        title={'Achievements'}
        icon={<TrophyOutline fill="white" />}
        key={'/achievements'}
        onClick={() => setSelectedRoute('/achievements')}
        collapsed={collapsed}
        secondaryTag={'Coming Soon'}
        style={{
          cursor: 'not-allowed'
        }}
        selected={selectedRoute === '/achievements'}
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
