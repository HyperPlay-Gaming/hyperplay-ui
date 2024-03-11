import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './index'

const meta: Meta<typeof Tabs> = {
  title: 'Layout/LayoutTabs',
  component: Tabs
}

type Story = StoryObj<typeof Tabs>

export default meta

export const Default: Story = {
  render: () => (
    <Tabs unstyled defaultValue="basic">
      <Tabs.List>
        <Tabs.Tab value="basic">1. Basic Details</Tabs.Tab>
        <Tabs.Tab value="eligibility">2. Eligibility Requirements</Tabs.Tab>
        <Tabs.Tab value="reward">3. Reward Details</Tabs.Tab>
        <Tabs.Tab value="deposit">4. Deposit Rewards</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="basic">Basic Details tab content</Tabs.Panel>
      <Tabs.Panel value="eligibility">
        Eligibility Requirements tab content
      </Tabs.Panel>
      <Tabs.Panel value="reward">Reward Details tab content</Tabs.Panel>
      <Tabs.Panel value="deposit">Deposit Rewards tab content</Tabs.Panel>
    </Tabs>
  )
}

export const WithSpaceBetweenTabs: Story = {
  render: () => (
    <Tabs
      unstyled
      defaultValue="basic"
      styles={{
        list: {
          display: 'flex',
          gap: '16px'
        }
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="basic">1. Basic Details</Tabs.Tab>
        <Tabs.Tab value="eligibility">2. Eligibility Requirements</Tabs.Tab>
        <Tabs.Tab value="reward">3. Reward Details</Tabs.Tab>
        <Tabs.Tab value="deposit">4. Deposit Rewards</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="basic">Basic Details tab content</Tabs.Panel>
      <Tabs.Panel value="eligibility">
        Eligibility Requirements tab content
      </Tabs.Panel>
      <Tabs.Panel value="reward">Reward Details tab content</Tabs.Panel>
      <Tabs.Panel value="deposit">Deposit Rewards tab content</Tabs.Panel>
    </Tabs>
  )
}
