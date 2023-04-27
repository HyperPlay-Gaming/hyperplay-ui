import React from 'react'

import Tabs from '.'

export default {
  title: 'Tabs',
  component: Tabs
}

export const Default = () => (
  <Tabs defaultValue="tab2">
    <Tabs.List>
      <Tabs.Tab value={'tab1'}>
        <div className="menu">Option 1</div>
      </Tabs.Tab>
      <Tabs.Tab value={'tab2'}>
        <div className="menu">Option 2</div>
      </Tabs.Tab>
      <Tabs.Tab value={'tab3'}>
        <div className="menu">Option 3</div>
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value={'tab1'}>
      <div>Tab 1</div>
    </Tabs.Panel>
    <Tabs.Panel value={'tab2'}>
      <div>Tab 2</div>
    </Tabs.Panel>
    <Tabs.Panel value={'tab3'}>
      <div>Tab 3</div>
    </Tabs.Panel>
  </Tabs>
)

export const Outlined = () => (
  <Tabs defaultValue="tab2">
    <Tabs.List type="outline">
      <Tabs.Tab value={'tab1'}>
        <div className="menu">Option 1</div>
      </Tabs.Tab>
      <Tabs.Tab value={'tab2'}>
        <div className="menu">Option 2</div>
      </Tabs.Tab>
      <Tabs.Tab value={'tab3'}>
        <div className="menu">Option 3</div>
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value={'tab1'}>
      <div>Tab 1</div>
    </Tabs.Panel>
    <Tabs.Panel value={'tab2'}>
      <div>Tab 2</div>
    </Tabs.Panel>
    <Tabs.Panel value={'tab3'}>
      <div>Tab 3</div>
    </Tabs.Panel>
  </Tabs>
)
