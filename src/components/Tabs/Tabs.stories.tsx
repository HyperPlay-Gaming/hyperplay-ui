import React from 'react'

import { Tabs } from '@mantine/core'

export default {
  title: 'Tabs',
  component: Tabs
}

export const Default = () => (
  <Tabs defaultValue="tab2">
    <Tabs.List>
      <Tabs.Tab
        value={'tab1'}
        style={{ backgroundColor: 'white', borderRadius: '10px 0px 0px 10px' }}
      >
        Tab 1
      </Tabs.Tab>
      <Tabs.Tab value={'tab2'}>Tab 2</Tabs.Tab>
    </Tabs.List>
  </Tabs>
)
